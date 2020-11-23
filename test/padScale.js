/* globals describe it */
import * as assert from 'assert';
import {
	scaleLinear, scaleTime, scaleLog, scalePow, scaleSqrt, scaleSymlog } from 'd3-scale';
import padScale from '../src/utils/padScale.js';

const name = 'padScale';

const badScale = () => {};

const badScaleMissingDomain = () => {};
badScaleMissingDomain.range = () => {};

const badScaleMissingRange = () => {};
badScaleMissingRange.domain = () => {};

const tests = [
	{ name: 'linear undefined padding', args: [scaleLinear()], expected: [0, 1] },
	{ name: 'linear no padding', args: [scaleLinear(), [0, 0]] },
	{ name: 'linear', args: [scaleLinear().domain([-100, 100]), [0, 0]] },
	{ name: 'linear negative domain', args: [scaleLinear().domain([-100, 100]).range([0, 100]), [0, 10]] },

	{ name: 'linear bump min', args: [scaleLinear().domain([0, 100]).range([0, 100]), [10, 0]] },
	{ name: 'linear bump max', args: [scaleLinear().domain([0, 100]).range([0, 100]), [0, 10]] },
	{ name: 'linear bump both', args: [scaleLinear().domain([0, 100]).range([0, 100]), [10, 10]] },

	{ name: 'log bump min', args: [scaleLog().domain([1, 100]).range([0, 100]), [10, 0]] },
	{ name: 'log bump max', args: [scaleLog().domain([1, 100]).range([0, 100]), [0, 10]] },
	{ name: 'log bump both', args: [scaleLog().domain([1, 100]).range([0, 100]), [10, 10]] },

	{ name: 'pow bump min', args: [scalePow().domain([1, 100]).range([0, 100]), [10, 0]] },
	{ name: 'pow bump max', args: [scalePow().domain([1, 100]).range([0, 100]), [0, 10]] },
	{ name: 'pow bump both', args: [scalePow().domain([1, 100]).range([0, 100]), [10, 10]] },

	{ name: 'sqrt bump min', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [10, 0]] },
	{ name: 'sqrt bump max', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [0, 10]] },
	{ name: 'sqrt bump both', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [10, 10]] },

	{ name: 'symlog bump min', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [10, 0]] },
	{ name: 'symlog bump max', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [0, 10]] },
	{ name: 'symlog bump both', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [10, 10]] },

	{ name: 'time change min', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 0]] },
	{ name: 'time change max', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [0, 10]] },
	{ name: 'time change both', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 10]] },

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
				const paddedDomain = padScale(...test.args);

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
			});
		});
	});
});

describe(`${name} errors`, () => {
	errorTests.forEach(test => {
		describe(test.name, () => {
			it(`should throw error ${test.expected}`, () => {
				const actual = function () { padScale(...test.args); };
				assert.throws(actual, test.expected);
			});
		});
	});
});
