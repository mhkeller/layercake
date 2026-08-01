/* globals describe it beforeEach afterEach */
import * as assert from 'assert';

import createEmptySizeWarner from '../../src/lib/helpers/createEmptySizeWarner.js';

const realWarn = console.warn;

/** @type {Array<string>} */
let warnings = [];

/** Wait past the warner's debounce so anything it queued has fired. */
function settle() {
	return new Promise(resolve => setTimeout(resolve, 300));
}

describe('createEmptySizeWarner', () => {
	beforeEach(() => {
		warnings = [];
		console.warn = (/** @type {any} */ message) => warnings.push(String(message));
	});

	afterEach(() => {
		console.warn = realWarn;
	});

	it('says nothing about a chart that has room to draw in', async () => {
		createEmptySizeWarner()(900, 500);
		await settle();
		assert.deepStrictEqual(warnings, []);
	});

	it('names the width when the width is gone', async () => {
		createEmptySizeWarner()(0, 500);
		await settle();
		assert.strictEqual(warnings.length, 1);
		assert.match(warnings[0], /zero or negative width/);
	});

	it('names the height when the height is gone', async () => {
		createEmptySizeWarner()(900, -20);
		await settle();
		assert.strictEqual(warnings.length, 1);
		assert.match(warnings[0], /zero or negative height/);
	});

	it('names both when the container has no size at all', async () => {
		createEmptySizeWarner()(0, 0);
		await settle();
		assert.strictEqual(warnings.length, 2);
	});

	// The first call happens before the container has reported its size, so an
	// eager warner would call every chart with more than 100px of padding broken
	it('waits rather than warning on the spot', async () => {
		createEmptySizeWarner()(0, 0);
		assert.deepStrictEqual(warnings, []);
		// Let it land rather than leaving a timer to fire into the next test
		await settle();
		assert.strictEqual(warnings.length, 2);
	});

	// This is why each chart builds its own warner instead of sharing one
	it('lets two charts warn without cancelling each other', async () => {
		createEmptySizeWarner()(0, 500);
		createEmptySizeWarner()(0, 500);
		await settle();
		assert.strictEqual(warnings.length, 2);
	});

	// A chart dragged through zero shouldn't warn once per frame
	it('collapses a burst from one chart into a single warning', async () => {
		const warn = createEmptySizeWarner();
		warn(0, 500);
		warn(0, 500);
		warn(0, 500);
		await settle();
		assert.strictEqual(warnings.length, 1);
	});

	// The last call wins, so a chart that lands on a good size stays quiet
	it('drops a queued warning when the chart recovers', async () => {
		const warn = createEmptySizeWarner();
		warn(0, 0);
		warn(900, 500);
		await settle();
		assert.deepStrictEqual(warnings, []);
	});
});
