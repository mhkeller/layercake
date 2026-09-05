/* globals describe it */
import * as assert from 'assert';

import debounce from '../../src/lib/utils/debounce.js';

/** Wait past a debounce window so anything it queued has fired. */
function settle(ms = 50) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe('debounce', () => {
	it('collapses a burst of calls into one, made with the last arguments', async () => {
		/** @type {Array<any>} */
		const calls = [];
		const fn = debounce((/** @type {any} */ v) => calls.push(v), 20);
		fn(1);
		fn(2);
		fn(3);
		assert.deepStrictEqual(calls, []);
		await settle();
		assert.deepStrictEqual(calls, [3]);
	});

	it('two debounced functions run independently', async () => {
		/** @type {Array<any>} */
		const calls = [];
		const a = debounce(() => calls.push('a'), 20);
		const b = debounce(() => calls.push('b'), 20);
		a();
		b();
		await settle();
		assert.deepStrictEqual(calls.sort(), ['a', 'b']);
	});

	// LayerCake cancels its debounced warners on destroy so a timer
	// scheduled just before unmount can't log for a chart that no longer exists
	it('cancel() drops a pending call', async () => {
		/** @type {Array<any>} */
		const calls = [];
		const fn = debounce(() => calls.push('ran'), 20);
		fn();
		fn.cancel();
		await settle();
		assert.deepStrictEqual(calls, []);
	});

	it('cancel() on an idle debounce is a no-op', () => {
		const fn = debounce(() => {}, 20);
		assert.doesNotThrow(() => fn.cancel());
	});
});
