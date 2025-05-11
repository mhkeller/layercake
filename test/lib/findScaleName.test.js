/* globals describe it */
import * as assert from 'assert';
import * as d3Scale from 'd3-scale';
import fn from '../../src/lib/helpers/findScaleName.js';

const name = 'findScaleName';

const exclude = ['scaleImplicit', 'tickFormat', 'scaleUtc'];

const tests = Object.keys(d3Scale)
	.filter(d => {
		// const tests = ['scaleSequentialQuantile']
		return !exclude.includes(d);
	})
	.map(d => {
		return { name: d, args: [d3Scale[d]] };
	});

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
			it(`should equal ${JSON.stringify(test.name)}`, () => {
				const actual = fn(...test.args);
				assert.equal(actual, test.name);
			});
		});
	});
});
