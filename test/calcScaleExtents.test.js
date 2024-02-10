/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/helpers/calcScaleExtents.js';

import { scaleLinear, scaleBand, scaleSqrt, scalePoint, scaleLog,  scaleOrdinal } from 'd3-scale';

const name = 'calcScaleExtents';

// TODO more tests
const tests = [
	{
		args: [
			[{ mx: 0 }, { mx: 1 }, { mx: 2 }, { mx: 3 }],
			{ x: d => d.mx },
			{ x: scaleLinear() }
		], expected: { x: [0, 3] }
	},
	{
		args: [
			[{ mx: 0 }, { mx: 1 }, { mx: 2 }, { mx: 3 }],
			{ x: d => d.mx },
			{ x: scaleBand() }
		], expected: { x: [0, 1, 2, 3] }
	},
	{
		args: [
			[{ mx: 0, my: '0' }, { mx: 1, my: '1' }, { mx: 2, my: '2' }, { mx: 3, my: '3' }],
			{ x: d => d.mx, y: d => d.my },
			{ x: scaleLinear(), y: scaleBand() }
		], expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[{ mx: 0, my: '0' }, { mx: 1, my: '1' }, { mx: 2, my: '2' }, { mx: 3, my: '3' }],
			{ x: d => d.mx, y: d => d.my },
			{ x: scaleSqrt(), y: scalePoint() }
		], expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[{ mx: 0, my: '1' }, { mx: 1, my: '0' }, { mx: 2, my: '2' }, { mx: 3, my: '3' }],
			{ x: d => d.mx, y: d => d.my },
			{ x: scaleSqrt(), y: scalePoint() }
		], expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[{ mx: 0, my: '1' }, { mx: 1, my: '0' }, { mx: 2, my: '2' }, { mx: 3, my: '3' }],
			{ x: d => d.mx, y: d => d.my },
			{ x: scaleSqrt(), y: scalePoint() }
		], expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[{ mx: 0, my: '0' }, { mx: 1, my: '1' }, { mx: 2, my: '2' }, { mx: 3, my: '3' }],
			{ x: d => d.mx, y: d => d.my },
			{ x: scaleLog(), y: scaleOrdinal() }
		], expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
];

describe(name, () => {
	tests.forEach((test) => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
