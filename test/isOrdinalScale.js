/* globals describe it */
import * as assert from 'assert';
import * as d3Scale from 'd3-scale';

import fn from '../src/lib/helpers/isOrdinalScale.js';

const name = 'isOrdinalScale';

const tests = [
	{ name: 'scaleLinear', expected: 'other' },
	{ name: 'scaleLog', expected: 'other' },
	{ name: 'scaleSymlog', expected: 'other' },
	{ name: 'scalePow', expected: 'other' },
	{ name: 'scaleSqrt', expected: 'other' },
	{ name: 'scaleIdentity', expected: 'other' },
	{ name: 'scaleTime', expected: 'other' },
	{ name: 'scaleRadial', expected: 'other' },

	{ name: 'scaleOrdinal', expected: 'ordinal' },
	{ name: 'scaleBand', expected: 'ordinal' },
	{ name: 'scalePoint', expected: 'ordinal' },

	{ name: 'scaleSequential', expected: 'other' },
	{ name: 'scaleDiverging', expected: 'other' },
	{ name: 'scaleQuantile', expected: 'other' },
	{ name: 'scaleQuantize', expected: 'other' },
	{ name: 'scaleThreshold', expected: 'other' },
	{ name: 'scaleTime', expected: 'other' },
	{ name: 'scaleUtc', expected: 'other' },
	{ name: 'scaleSequentialLog', expected: 'other' },
	{ name: 'scaleSequentialPow', expected: 'other' },
	{ name: 'scaleSequentialSqrt', expected: 'other' },
	{ name: 'scaleSequentialSymlog', expected: 'other' },
	{ name: 'scaleSequentialQuantile', expected: 'other' },
	{ name: 'scaleDivergingLog', expected: 'other' },
	{ name: 'scaleDivergingPow', expected: 'other' },
	{ name: 'scaleDivergingSqrt', expected: 'other' },
	{ name: 'scaleDivergingSymlog', expected: 'other' },


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
