/* globals describe it */
import * as assert from 'assert';
import * as d3Scale from 'd3-scale';

import fn from '../src/lib/helpers/isOrdinalDomain.js/index.js';

const name = 'isOrdinalScale';

const tests = [
	{ name: 'scaleOrdinal', expected: true },
	{ name: 'scaleBand', expected: true },
	{ name: 'scalePoint', expected: true },

	{ name: 'scaleLinear', expected: false },
	{ name: 'scaleLog', expected: false },
	{ name: 'scaleSymlog', expected: false },
	{ name: 'scalePow', expected: false },
	{ name: 'scaleSqrt', expected: false },
	{ name: 'scaleIdentity', expected: false },
	{ name: 'scaleTime', expected: false },
	{ name: 'scaleRadial', expected: false },

	{ name: 'scaleQuantile', expected: false },
	{ name: 'scaleQuantize', expected: false },
	{ name: 'scaleThreshold', expected: false },
	{ name: 'scaleTime', expected: false },
	{ name: 'scaleUtc', expected: false },

	{ name: 'scaleSequential', expected: false },
	{ name: 'scaleSequentialLog', expected: false },
	{ name: 'scaleSequentialPow', expected: false },
	{ name: 'scaleSequentialSqrt', expected: false },
	{ name: 'scaleSequentialSymlog', expected: false },
	{ name: 'scaleSequentialQuantile', expected: false },

	{ name: 'scaleDiverging', expected: false },
	{ name: 'scaleDivergingLog', expected: false },
	{ name: 'scaleDivergingPow', expected: false },
	{ name: 'scaleDivergingSqrt', expected: false },
	{ name: 'scaleDivergingSymlog', expected: false },

];

tests.forEach(d => {
	d.args = [d3Scale[d.name]()];
});

describe(name, () => {
	tests.forEach(test => {
		describe(test.name, () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.equal(actual, test.expected);
			});
		});
	});
});
