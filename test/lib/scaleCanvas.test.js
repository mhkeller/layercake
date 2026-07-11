/* globals describe it beforeEach afterEach globalThis */
import * as assert from 'assert';
import fn from '../../src/lib/lib/scaleCanvas.js';

const name = 'scaleCanvas';

/**
 * Minimal stand-in for a canvas 2d context. The width/height setters
 * mimic the DOM's unsigned-long coercion (truncation) and reset counting
 * so tests can assert when the buffer was actually cleared.
 */
function makeCtx() {
	const canvas = {
		_width: 300,
		_height: 150,
		style: {},
		get width() {
			return this._width;
		},
		set width(v) {
			this._width = Math.trunc(v);
			this.resets += 1;
		},
		get height() {
			return this._height;
		},
		set height(v) {
			this._height = Math.trunc(v);
			this.resets += 1;
		},
		resets: 0
	};
	const transforms = [];
	const ctx = {
		canvas,
		setTransform(a, b, c, d, e, f) {
			transforms.push([a, b, c, d, e, f]);
		}
	};
	return { ctx, canvas, transforms };
}

describe(name, () => {
	const originalWindow = globalThis.window;

	beforeEach(() => {
		globalThis.window = { devicePixelRatio: 1 };
	});

	afterEach(() => {
		globalThis.window = originalWindow;
	});

	it('applies the dpr transform even when the target buffer matches the default 300x150', () => {
		globalThis.window.devicePixelRatio = 2;
		const { ctx, canvas, transforms } = makeCtx();

		// 150x75 at dpr=2 computes exactly the default 300x150 buffer
		const result = fn(ctx, 150, 75);

		assert.deepStrictEqual(transforms, [[2, 0, 0, 2, 0, 0]]);
		assert.strictEqual(canvas.style.width, '150px');
		assert.strictEqual(canvas.style.height, '75px');
		assert.deepStrictEqual(result, { width: 300, height: 150 });
	});

	it('skips the buffer reset on a repeated call with the same dimensions', () => {
		globalThis.window.devicePixelRatio = 2;
		const { ctx, canvas, transforms } = makeCtx();

		fn(ctx, 200, 100);
		const resetsAfterFirst = canvas.resets;
		const result = fn(ctx, 200, 100);

		assert.strictEqual(canvas.resets, resetsAfterFirst);
		assert.strictEqual(transforms.length, 2);
		assert.deepStrictEqual(result, { width: 400, height: 200 });
	});

	it('skips the buffer reset on repeated calls under a fractional devicePixelRatio', () => {
		globalThis.window.devicePixelRatio = 1.5;
		const { ctx, canvas } = makeCtx();

		const first = fn(ctx, 333, 111);
		const resetsAfterFirst = canvas.resets;
		const second = fn(ctx, 333, 111);

		assert.strictEqual(canvas.resets, resetsAfterFirst);
		// Math.round(333 * 1.5) = 500; the returned size matches the real integer buffer
		assert.deepStrictEqual(first, { width: 500, height: 167 });
		assert.deepStrictEqual(second, first);
		assert.strictEqual(canvas.width, 500);
	});

	it('resizes the buffer when the container size changes', () => {
		const { ctx, canvas } = makeCtx();

		fn(ctx, 200, 100);
		const resetsAfterFirst = canvas.resets;
		fn(ctx, 400, 300);

		assert.ok(canvas.resets > resetsAfterFirst);
		assert.strictEqual(canvas.width, 400);
		assert.strictEqual(canvas.height, 300);
	});

	it('reapplies the transform and style when dpr changes even if the buffer size coincides', () => {
		const { ctx, canvas, transforms } = makeCtx();

		globalThis.window.devicePixelRatio = 1;
		fn(ctx, 300, 150);
		globalThis.window.devicePixelRatio = 2;
		// 150x75 at dpr=2 → same 300x150 buffer, but the transform must be reapplied
		fn(ctx, 150, 75);

		assert.deepStrictEqual(transforms, [
			[1, 0, 0, 1, 0, 0],
			[2, 0, 0, 2, 0, 0]
		]);
		assert.strictEqual(canvas.style.width, '150px');
	});

	it('normalizes the transform on every call so a dirtied transform cannot persist', () => {
		globalThis.window.devicePixelRatio = 2;
		const { ctx, transforms } = makeCtx();

		fn(ctx, 200, 100);
		// caller translates/scales for its own drawing, then draws again
		fn(ctx, 200, 100);

		assert.deepStrictEqual(transforms, [
			[2, 0, 0, 2, 0, 0],
			[2, 0, 0, 2, 0, 0]
		]);
	});

	it('resizes when something external resized the canvas buffer', () => {
		const { ctx, canvas } = makeCtx();

		fn(ctx, 200, 100);
		canvas.width = 10;
		fn(ctx, 200, 100);

		assert.strictEqual(canvas.width, 200);
	});
});
