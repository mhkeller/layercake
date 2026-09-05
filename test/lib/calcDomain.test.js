/* globals describe it */
import * as assert from 'assert';

import calcDomain from '../../src/lib/helpers/calcDomain.js';

describe('calcDomain', () => {
	it('returns the extent when no domain prop was passed', () => {
		assert.deepStrictEqual(calcDomain([0, 10], undefined), [0, 10]);
	});

	it('fills null and undefined placeholders from the extent', () => {
		assert.deepStrictEqual(calcDomain([0, 10], [null, 100]), [0, 100]);
		assert.deepStrictEqual(calcDomain([0, 10], [undefined, 100]), [0, 100]);
	});

	it('a complete domain prop passes through unchanged', () => {
		assert.deepStrictEqual(calcDomain([0, 10], [-5, 5]), [-5, 5]);
	});

	it('calls a domain function with the extent it was given', () => {
		assert.deepStrictEqual(
			calcDomain([0, 10], (/** @type {any} */ d) => [0, d[1] * 2]),
			[0, 20]
		);
	});

	it('returns undefined when there is neither an extent nor a domain prop', () => {
		assert.strictEqual(calcDomain(undefined, undefined), undefined);
	});

	it('a domain function returning a partial domain still gets filled', () => {
		assert.deepStrictEqual(
			calcDomain([0, 10], () => [null, 100]),
			[0, 100]
		);
	});
});
