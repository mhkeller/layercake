/* globals describe it */
import * as assert from 'assert';

import keepIfEqual from '../../src/lib/utils/keepIfEqual.js';

describe('keepIfEqual', () => {
	it('keeps the previous array identity when values match', () => {
		const prev = [0, 100];
		assert.strictEqual(keepIfEqual(prev, [0, 100]), prev);
	});

	// Order matters – [0, 100] and [100, 0] are different ranges
	it('same values in a different order are a new array', () => {
		const prev = [0, 100];
		const next = [100, 0];
		assert.strictEqual(keepIfEqual(prev, next), next);
	});

	it('different lengths are a new array', () => {
		const next = [0, 50, 100];
		assert.strictEqual(keepIfEqual([0, 100], next), next);
	});

	it('a first read passes through', () => {
		const next = [0, 100];
		assert.strictEqual(keepIfEqual(undefined, next), next);
	});

	it('non-arrays pass through', () => {
		assert.strictEqual(keepIfEqual([0, 100], null), null);
		assert.strictEqual(keepIfEqual([0, 100], undefined), undefined);
	});
});
