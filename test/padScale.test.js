/* globals describe it */
import * as assert from 'assert';
import {
	scaleLinear,
	scaleTime,
	scaleLog,
	scalePow,
	scaleSqrt,
	scaleSymlog,
	scaleOrdinal,
	scaleBand,
	scalePoint,
	scaleThreshold,
	scaleQuantile,
	scaleQuantize,
	scaleSequentialQuantile
} from 'd3-scale';

import fn from '../src/lib/utils/padScale.js';

const name = 'padScale';

const badScale = () => {};

const badScaleMissingDomain = () => {};
badScaleMissingDomain.range = () => {};

const badScaleMissingRange = () => {};
badScaleMissingRange.domain = () => {};

const tests = [
	{ name: 'linear undefined padding', args: [scaleLinear()], expected: [0, 1] },
	{ name: 'linear no padding', args: [scaleLinear(), [0, 0]], expected: [0, 1] },
	{ name: 'linear', args: [scaleLinear().domain([-100, 100]), [0, 0]], expected: [-100, 100] },
	{ name: 'linear negative domain', args: [scaleLinear().domain([-100, 100]).range([0, 100]), [0, 10]], expected: [-100, 122.22222222222223] },

	{ name: 'linear bump min', args: [scaleLinear().domain([0, 100]).range([0, 100]), [10, 0]], expected: [-11.11111111111111, 100] },
	{ name: 'linear bump max', args: [scaleLinear().domain([0, 100]).range([0, 100]), [0, 10]], expected: [0, 111.11111111111111] },
	{ name: 'linear bump both', args: [scaleLinear().domain([0, 100]).range([0, 100]), [10, 10]], expected: [-12.5, 112.5] },

	{ name: 'log bump min', args: [scaleLog().domain([1, 100]).range([0, 100]), [10, 0]], expected: [0.5994842503189409, 100.00000000000004] },
	{ name: 'log bump max', args: [scaleLog().domain([1, 100]).range([0, 100]), [0, 10]], expected: [1, 166.810053720006] },
	{ name: 'log bump both', args: [scaleLog().domain([1, 100]).range([0, 100]), [10, 10]], expected: [0.5623413251903491, 177.82794100389242] },

	{ name: 'pow bump min', args: [scalePow().domain([1, 100]).range([0, 100]), [10, 0]], expected: [-10, 100] },
	{ name: 'pow bump max', args: [scalePow().domain([1, 100]).range([0, 100]), [0, 10]], expected: [1, 111] },
	{ name: 'pow bump both', args: [scalePow().domain([1, 100]).range([0, 100]), [10, 10]], expected: [-11.375, 112.375] },

	{ name: 'sqrt bump min', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [10, 0]], expected: [0, 100] },
	{ name: 'sqrt bump max', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [0, 10]], expected: [1, 121] },
	{ name: 'sqrt bump both', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [10, 10]], expected: [-0.015625, 123.765625] },

	{ name: 'symlog bump min', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [10, 0]], expected: [0.2935267017032884, 100.00000000000003] },
	{ name: 'symlog bump max', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [0, 10]], expected: [1, 155.1622189429957] },
	{ name: 'symlog bump both', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [10, 10]], expected: [0.2249505961681577, 163.90460973029315] },

	{ name: 'time change min', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 0]], expected: [new Date('2009-11-21T13:20:00.000Z'), new Date('2010-12-31T00:00:00.000Z')] },
	{ name: 'time change max', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [0, 10]], expected: [new Date('2010-01-01T00:00:00.000Z'), new Date('2011-02-09T10:40:00.000Z')] },
	{ name: 'time change both', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 10]], expected: [new Date('2009-11-16T12:00:00.000Z'), new Date('2011-02-14T12:00:00.000Z')] },
];

const ordinalTests = [
	{ name: 'ordinal', args: [scaleOrdinal().domain([0, 100]).range([0, 100]), [10, 10]], expected: [0, 100] },
	{ name: 'ordinal', args: [scaleOrdinal().domain(['0', '1', '2']).range([0, 100]), [10, 10]], expected: ['0', '1', '2'] },
	{ name: 'band', args: [scaleBand().domain(['a', 'b', 'c']).range([0, 100]), [10, 10]], expected: ['a', 'b', 'c'] },
	{ name: 'point', args: [scalePoint().domain(['b', 'd', 'e']).range([0, 100]), [10, 10]], expected: ['b', 'd', 'e'] },
];

const discreteRangeTests = [
	{ name: 'threshold', args: [scaleThreshold().domain([0, 10]).range(['a', 'b', 'c']), [10, 10]], expected: [0, 10] },
	{ name: 'quantile', args: [scaleQuantile().domain([0, 10]).range(['a', 'b', 'c']), [10, 10]], expected: [0, 10] },
	{ name: 'quantize', args: [scaleQuantize().domain([0, 10]).range(['a', 'b', 'c']), [10, 10]], expected: [0, 10] },
	{ name: 'sequentialQuantile', args: [scaleSequentialQuantile().domain([0, 10]), [10, 10]], expected: [0, 10] },
];

const errorTests = [
	{
		name: 'bad scale',
		args: [badScale, [0, 1]],
		expected: /^Error: Scale method `range` must be a function$/
	},
	{
		name: 'bad scale',
		args: [badScaleMissingDomain, [0, 1]],
		expected: /^Error: Scale method `domain` must be a function$/
	},
	{
		name: 'bad scale',
		args: [badScaleMissingRange, [0, 1]],
		expected: /^Error: Scale method `range` must be a function$/
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(test.name, () => {
			it(`should equal ${JSON.stringify(test.args[1] || test.expected)}`, () => {
				if (typeof test.args[1] === 'undefined') {
					assert.deepStrictEqual(test.args[0].domain(), test.expected);
					return;
				}
				const paddedDomain = fn(...test.args);

				const originalScale = test.args[0];
				const padding = test.args[1];
				const paddedScale = originalScale.copy().domain(paddedDomain);

				/* --------------------------------------------
				 * Test the min
				 */
				const originalMinValue = originalScale(originalScale.domain()[0]);
				const paddedMinValue = paddedScale(originalScale.domain()[0]);

				const diffMinValue = paddedMinValue - originalMinValue;
				assert.deepStrictEqual(diffMinValue.toFixed(5), padding[0].toFixed(5));

				/* --------------------------------------------
				 * Test max value
				 */
				const originalMaxValue = originalScale(originalScale.domain()[1]);
				const paddedMaxValue = paddedScale(originalScale.domain()[1]);

				const diffMaxValue = originalMaxValue - paddedMaxValue;
				assert.deepStrictEqual(diffMaxValue.toFixed(5), padding[1].toFixed(5));

				/* --------------------------------------------
				 * Test the domain
				 */
				assert.deepStrictEqual(paddedScale.domain(), test.expected);
			});
		});
	});
});

describe(`${name} errors`, () => {
	errorTests.forEach(test => {
		describe(test.name, () => {
			it(`should throw error ${test.expected}`, () => {
				const actual = function () { fn(...test.args); };
				assert.throws(actual, test.expected);
			});
		});
	});
});

describe(`ordinal scales`, () => {
	ordinalTests.forEach(test => {
		describe(test.name, () => {
			it(`should equal ${test.expected}`, () => {
				const paddedDomain = fn(...test.args);
				assert.deepStrictEqual(paddedDomain, test.expected);
			});
		});
	});
});

describe(`discrete range scales`, () => {
	discreteRangeTests.forEach(test => {
		describe(test.name, () => {
			it(`should equal ${test.expected}`, () => {
				const paddedDomain = fn(...test.args);
				assert.deepStrictEqual(paddedDomain, test.expected);
			});
		});
	});
});
// console.log('scale squential', scaleSequentialQuantile().range());
