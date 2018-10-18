/* globals describe it */
import padScale from '../src/utils/padScale.js';
import * as assert from 'assert';
import { scaleLinear, scaleTime } from 'd3-scale';

const name = 'padScale';

const badScale = function () {
};

badScale.domain = function () {
	return [0, 1];
};

const tests = [
	{ name: 'bad scale', args: [badScale, [0, 1]], expected: [0, 1] },
	{ name: 'linear no padding', args: [scaleLinear()], expected: [0, 1] },
	{ name: 'linear', args: [scaleLinear().domain([-100, 100])], expected: [-100, 100] },
	{ name: 'linear negative domain', args: [scaleLinear().domain([-100, 100]).range([0, 100]), [0, 10]], expected: [-100, 120] },
	{ name: 'linear bump max', args: [scaleLinear().domain([0, 100]).range([0, 100]), [0, 10]], expected: [0, 110] },
	{ name: 'linear change both', args: [scaleLinear().domain([-5, 5]).range([0, 100]), [10, 10]], expected: [-6, 6] },
	{ name: 'time change both', args: [scaleTime().domain([new Date(Date.UTC(2010, 0, 1)), new Date(Date.UTC(2010, 11, 31))]).range([0, 100]), [10, 10]], expected: [new Date(1259159040000), new Date(1296898560000)] }
];

describe(name, function () {
	tests.forEach(test => {
		describe(test.name, function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = padScale(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
