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
	{ name: 'linear no padding', args: [scaleLinear()], expected: [[0, 1]] },
	{ name: 'linear', args: [scaleLinear().domain([-100, 100])], expected: [[-100, 100]] },
	{ name: 'linear negative domain', args: [scaleLinear().domain([-100, 100]).range([0, 100]), [0, 10]], expected: [[-100, 120], [0, 9.09]] },

	{ name: 'linear bump max', args: [scaleLinear().domain([0, 100]).range([0, 100]), [0, 10]], expected: [[0, 110], [0, 9.09]] },
	{ name: 'log bump max', args: [scaleLog().domain([1, 100]).range([0, 100]), [0, 10]], expected: [[1, 158.4893192461114], [0, 9.09]] },
	{ name: 'pow bump max', args: [scalePow().domain([1, 100]).range([0, 100]), [0, 10]], expected: [[1, 109.9], [0, 9.09]] },
	{ name: 'sqrt bump max', args: [scaleSqrt().domain([1, 100]).range([0, 100]), [0, 10]], expected: [[1, 118.81], [0, 9.09]] },
	{ name: 'symlog bump max', args: [scaleSymlog().domain([1, 100]).range([0, 100]), [0, 10]], expected: [[1, 148.5032079513956], [0, 9.09]] },

	{ name: 'linear change min', args: [scaleLinear().domain([-5, 5]).range([0, 100]), [10, 0]], expected: [[-6, 5], [-9.09, 0]] },

	{ name: 'linear change both', args: [scaleLinear().domain([-5, 5]).range([0, 100]), [10, 10]], expected: [[-6, 6], [-8.33, 8.33]] },
	{ name: 'time change both', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 10]], expected: [[new Date(1259159040000), new Date(1296898560000)], [-8.33, 8.33]] },

	{ name: 'linear change both', args: [scaleLinear().domain([100, 200]).range([0, 100]), [5, 5]], expected: [[95, 205], [-4.55, 4.55]] },
	{ name: 'log change both', args: [scaleLog().domain([100, 200]).range([0, 100]), [5, 5]], expected: [[96.59363289248464, 207.05298476827534], [-4.55, 4.55]] },
	{ name: 'pow change both', args: [scalePow().domain([100, 200]).range([0, 100]), [5, 5]], expected: [[95, 205], [-4.55, 4.55]] },
	{ name: 'sqrt change both', args: [scaleSqrt().domain([100, 200]).range([0, 100]), [5, 5]], expected: [[95.9007575950825, 205.90075759508252], [-4.55, 4.55]] },
	{ name: 'symlog change both', args: [scaleSymlog().domain([100, 200]).range([0, 100]), [5, 5]], expected: [[96.58378060470284, 207.03662119052643], [-4.55, 4.55]] },

	{ name: 'linear change min', args: [scaleLinear().domain([0, 100]).range([0, 100]), [50, 0]], expected: [[-50, 100], [-33.33, 0]] },
	{ name: 'log change min', args: [scaleLog().domain([1, 100]).range([0, 100]), [50, 0]], expected: [[0.09999999999999998, 100.00000000000004], [-33.33, 0]] },
	{ name: 'log change min, undefined max', args: [scaleLog().domain([1, 100]).range([0, 100]), [50]], expected: [[0.09999999999999998, 100], [-33.33, 0]] },

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
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = padScale(...test.args);

				const oScale = test.args[0];
				const newScale = oScale.copy().domain(actual);

				const originalMinRange = oScale(oScale.domain()[0]);
				const newMinRange = newScale(oScale.domain()[0]);

				const originalMaxRange = oScale(oScale.domain()[1]);
				const newMaxRange = newScale(oScale.domain()[1]);
				// console.log(actual);
				console.log('*');
				console.log(test.args[0].domain(), actual);
				if (Array.isArray(test.args[1])) {
					console.log('min change by', test.args[1][0]);
					console.log('max change by', test.args[1][1]);
				}
				console.log('min diff', originalMinRange - newMinRange);
				console.log('max diff', originalMaxRange - newMaxRange);
				console.log('**');

				assert.deepStrictEqual(actual, test.expected[0]);
				console.log(test.expected[1], Array.isArray(test.expected[1]));

				if (Array.isArray(test.expected[1])) {
					assert.equal((originalMinRange - newMinRange).toFixed(2), test.expected[1][0]);
					assert.equal((originalMaxRange - newMaxRange).toFixed(2), test.expected[1][1]);
				}
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
