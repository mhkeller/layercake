/* globals describe it */
import * as assert from 'assert';
import { scaleLinear, scaleLog, scaleSymlog, scalePow, scaleIdentity, scaleTime, scaleRadial, scaleSqrt } from 'd3-scale';
import findScaleType from '../src/lib/helpers/findScaleType.js';

const name = 'findScaleType';

const tests = [
	{ name: 'scaleLinear', args: [scaleLinear()], expected: 'other' },
	{ name: 'scaleLog', args: [scaleLog()], expected: 'log' },
	{ name: 'scaleSymlog', args: [scaleSymlog()], expected: 'symlog' },
	{ name: 'scalePow', args: [scalePow()], expected: 'pow' },
	{ name: 'scaleSqrt', args: [scaleSqrt()], expected: 'sqrt' },
	{ name: 'scaleIdentity', args: [scaleIdentity()], expected: 'other' },
	{ name: 'scaleTime', args: [scaleTime()], expected: 'other' },
	{ name: 'scaleRadial', args: [scaleRadial()], expected: 'other' },
];

describe(name, () => {
	tests.forEach(test => {
		describe(test.name, () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = findScaleType(...test.args);
				assert.equal(actual, test.expected);
			});
		});
	});
});
