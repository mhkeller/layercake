/* globals describe it */
import * as assert from 'assert';
import minMax from '../src/utils/minMax.js';

const name = 'minMax';

const tests = [
	{ args: [[0, 1, 2], {}], expected: [0, 2] },
	{ args: [[0, 1, 2, null, undefined, NaN, Number.NaN], {}], expected: [0, 2] },
	{ args: [[null, 1, 0, -5, 2, null, undefined, NaN, Number.NaN], {}], expected: [-5, 2] },
	{ args: [[undefined, null, NaN]], expected: [null, null] },
	{
		args: [[
			'2010-01-04', '2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'
		]],
		expected: ['2010-01-02', '2010-01-06']
	}
];

describe(name, () => {
	describe('min', () => {
		tests.forEach(test => {
			const min = minMax('min');
			describe(JSON.stringify(test.args), () => {
				it(`should equal ${JSON.stringify(test.expected)}`, () => {
					const actual = min(...test.args);
					assert.strictEqual(actual, test.expected[0]);
				});
			});
		});
	});

	describe('max', () => {
		tests.forEach(test => {
			const max = minMax('max');
			describe(JSON.stringify(test.args), () => {
				it(`should equal ${JSON.stringify(test.expected)}`, () => {
					const actual = max(...test.args);
					assert.strictEqual(actual, test.expected[1]);
				});
			});
		});
	});

	describe('error', () => {
		it('should throw a type error', () => {
			const actual = () => minMax('foo');
			assert.throws(actual, /^TypeError: Argument must be either 'min' or 'max'.$/);
		});
	});
});
