/* globals describe it beforeEach afterEach globalThis */
import * as assert from 'assert';
import paintLayers from '../../src/lib/helpers/paintLayers.js';

const name = 'paintLayers';

// A stand-in for a 2d context that records every call so the tests can read
// the order things happened in
function makeCtx() {
	const calls = [];
	const canvas = { width: 300, height: 150, style: {} };
	const record =
		method =>
		(...args) => {
			calls.push([method, ...args]);
		};
	const ctx = {
		canvas,
		calls,
		setTransform: record('setTransform'),
		clearRect: record('clearRect'),
		save: record('save'),
		restore: record('restore'),
		translate: record('translate'),
		beginPath: record('beginPath'),
		rect: record('rect'),
		clip: record('clip')
	};
	return ctx;
}

const chart = {
	containerWidth: 600,
	containerHeight: 400,
	width: 550,
	height: 350,
	padding: { top: 20, right: 10, bottom: 30, left: 40 },
	overflow: 'visible'
};

describe(name, () => {
	const originalWindow = globalThis.window;
	const originalError = console.error;

	beforeEach(() => {
		globalThis.window = { devicePixelRatio: 2 };
	});

	afterEach(() => {
		globalThis.window = originalWindow;
		console.error = originalError;
	});

	it('runs every layer in order, each inside its own save/restore with a fresh path', () => {
		const ctx = makeCtx();
		const ran = [];
		paintLayers(ctx, [{ fn: () => ran.push('a') }, { fn: () => ran.push('b') }], chart);
		assert.deepStrictEqual(ran, ['a', 'b']);

		const methods = ctx.calls.map(c => c[0]);
		const firstSave = methods.indexOf('save');
		// outer save, then per layer: save, beginPath ... restore, then outer restore
		assert.deepStrictEqual(methods.slice(firstSave), [
			'save',
			'translate',
			'save',
			'beginPath',
			'restore',
			'save',
			'beginPath',
			'restore',
			'restore'
		]);
	});

	it('sizes the canvas to the container and moves the origin by the padding', () => {
		const ctx = makeCtx();
		paintLayers(ctx, [], chart);
		assert.strictEqual(ctx.canvas.style.width, '600px');
		assert.strictEqual(ctx.canvas.style.height, '400px');
		assert.deepStrictEqual(ctx.canvas.width, 1200);
		assert.ok(ctx.calls.some(c => c[0] === 'translate' && c[1] === 40 && c[2] === 20));
	});

	it('clears the whole old bitmap in device pixels before resizing it', () => {
		const ctx = makeCtx();
		paintLayers(ctx, [], chart);
		assert.deepStrictEqual(ctx.calls[0], ['setTransform', 1, 0, 0, 1, 0, 0]);
		// 300x150 is the size the canvas had before this paint
		assert.deepStrictEqual(ctx.calls[1], ['clearRect', 0, 0, 300, 150]);
	});

	it('clips to the chart area only when overflow is hidden', () => {
		const visible = makeCtx();
		paintLayers(visible, [], chart);
		assert.ok(!visible.calls.some(c => c[0] === 'clip'));

		const hidden = makeCtx();
		paintLayers(hidden, [], { ...chart, overflow: 'hidden' });
		const clipIdx = hidden.calls.findIndex(c => c[0] === 'clip');
		assert.ok(clipIdx > 0);
		assert.deepStrictEqual(hidden.calls[clipIdx - 1], ['rect', 0, 0, 550, 350]);
		assert.deepStrictEqual(hidden.calls[clipIdx - 2], ['beginPath']);
	});

	it('keeps painting the other layers when one throws and still restores the context', () => {
		const ctx = makeCtx();
		const errors = [];
		console.error = (...args) => errors.push(args);
		const ran = [];
		paintLayers(
			ctx,
			[
				{ fn: () => ran.push('a') },
				{
					fn: () => {
						throw new Error('boom');
					}
				},
				{ fn: () => ran.push('c') }
			],
			chart
		);
		assert.deepStrictEqual(ran, ['a', 'c']);
		assert.strictEqual(errors.length, 1);
		assert.ok(String(errors[0][0]).startsWith('[LayerCake]'));
		assert.strictEqual(errors[0][1].message, 'boom');

		const saves = ctx.calls.filter(c => c[0] === 'save').length;
		const restores = ctx.calls.filter(c => c[0] === 'restore').length;
		assert.strictEqual(saves, restores);
	});
});
