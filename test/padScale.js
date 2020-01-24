/* globals describe it */
import * as assert from 'assert';
import { scaleLinear, scaleTime } from 'd3-scale';
import padScale from '../src/utils/padScale.js';

const name = 'padScale';

const badScale = () => {};

const badScaleMissingDomain = () => {};
badScaleMissingDomain.range = () => {};

const badScaleMissingRange = () => {};
badScaleMissingRange.domain = () => {};

const tests = [
	{ name: 'linear no padding', args: [scaleLinear()], expected: [0, 1] },
	{ name: 'linear', args: [scaleLinear().domain([-100, 100])], expected: [-100, 100] },
	{ name: 'linear negative domain', args: [scaleLinear().domain([-100, 100]).range([0, 100]), [0, 10]], expected: [-100, 120] },
	{ name: 'linear bump max', args: [scaleLinear().domain([0, 100]).range([0, 100]), [0, 10]], expected: [0, 110] },
	{ name: 'linear change both', args: [scaleLinear().domain([-5, 5]).range([0, 100]), [10, 10]], expected: [-6, 6] },
	{ name: 'time change both', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 10]], expected: [new Date(1259159040000), new Date(1296898560000)] }
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
				assert.deepStrictEqual(actual, test.expected);
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
