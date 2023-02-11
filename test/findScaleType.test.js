/* globals describe it */
import * as assert from 'assert';
import * as d3Scale from 'd3-scale';
import fn from '../src/lib/helpers/findScaleType.js';

const name = 'findScaleType';

const tests = [
	{ name: 'scaleLog', expected: 'log' },
	{ name: 'scaleSymlog', expected: 'symlog' },
	{ name: 'scalePow', expected: 'pow' },
	{ name: 'scaleSqrt', expected: 'sqrt' },

	// { name: 'scaleImplicit', expected: 'other' },
	{ name: 'scaleQuantile', expected: 'other' },
	{ name: 'scaleQuantize', expected: 'other' },
	{ name: 'scaleThreshold', expected: 'other' },
	{ name: 'scaleUtc', expected: 'other' },

	{ name: 'scaleLinear', expected: 'other' },
	{ name: 'scaleIdentity', expected: 'other' },
	{ name: 'scaleTime', expected: 'other' },
	{ name: 'scaleRadial', expected: 'other' },

	{ name: 'scaleOrdinal', expected: 'other' },
	{ name: 'scaleBand', expected: 'other' },
	{ name: 'scalePoint', expected: 'other' },

	{ name: 'scaleSequential', expected: 'other' },
	{ name: 'scaleSequentialLog', expected: 'log' },
	{ name: 'scaleSequentialPow', expected: 'pow' },
	{ name: 'scaleSequentialSqrt', expected: 'sqrt' },
	{ name: 'scaleSequentialSymlog', expected: 'symlog' },
	{ name: 'scaleSequentialQuantile', expected: 'other' },
	{ name: 'scaleDiverging', expected: 'other' },
	{ name: 'scaleDivergingLog', expected: 'log' },
	{ name: 'scaleDivergingPow', expected: 'pow' },
	{ name: 'scaleDivergingSqrt', expected: 'sqrt' },
	{ name: 'scaleDivergingSymlog', expected: 'symlog' },
];

tests.forEach(d => {
	const scale = d3Scale[d.name];
	if (typeof scale !== 'function') {
		throw new Error(`No D3 scale found for name ${d.name}`);
	}
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
