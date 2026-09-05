/* globals describe it */
import * as assert from 'assert';

import measureExtent from '../../src/lib/helpers/measureExtent.js';

const rows = [{ v: 'b' }, { v: 'a' }, { v: 'b' }, { v: 'c' }];
const nums = [{ v: 9 }, { v: 2 }, { v: 5 }];

describe('measureExtent', () => {
	it('measures a [min, max] for a non-ordinal dimension', () => {
		assert.deepStrictEqual(
			measureExtent('x', d => d.v, nums, false, false),
			[2, 9]
		);
	});

	it('measures unique values for an ordinal dimension, in data order', () => {
		assert.deepStrictEqual(
			measureExtent('x', d => d.v, rows, true, false),
			['b', 'a', 'c']
		);
	});

	it('sorts ordinal uniques when asked', () => {
		assert.deepStrictEqual(
			measureExtent('x', d => d.v, rows, true, true),
			['a', 'b', 'c']
		);
	});

	it('passes the row index to accessors', () => {
		assert.deepStrictEqual(
			measureExtent('x', (d, i) => i, nums, false, false),
			[0, 2]
		);
	});
});
