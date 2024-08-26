/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/helpers/calcScaleExtents.js';

import { scaleLinear, scaleBand, scaleSqrt, scalePoint, scaleLog, scaleOrdinal } from 'd3-scale';

const name = 'calcScaleExtents';

const tests = [
	{
		args: [
			[{ mx: 0 }, { mx: 1 }, { mx: 2 }, { mx: 3 }],
			{ x: d => d.mx },
			{ x: { scale: scaleLinear() } }
		],
		expected: { x: [0, 3] }
	},
	{
		args: [
			[{ mx: 0 }, { mx: 2 }, { mx: 3 }, { mx: 1 }],
			{ x: d => d.mx },
			{ x: { scale: scaleBand(), sort: true } }
		],
		expected: { x: [0, 1, 2, 3] }
	},
	{
		args: [
			[{ mx: 2 }, { mx: 3 }, { mx: 0 }, { mx: 1 }],
			{ x: d => d.mx },
			{ x: { scale: scaleBand(), sort: true } }
		],
		expected: { x: [0, 1, 2, 3] }
	},
	{
		args: [
			[{ mx: 2 }, { mx: 3 }, { mx: 0 }, { mx: 1 }],
			{ x: d => d.mx },
			{ x: { scale: scaleBand() } }
		],
		expected: { x: [2, 3, 0, 1] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 2, my: '2' },
				{ mx: 3, my: '3' },
				{ mx: 1, my: '1' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleLinear() }, y: { scale: scaleBand(), sort: true } }
		],
		expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 2, my: '2' },
				{ mx: 3, my: '3' },
				{ mx: 1, my: '1' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleLinear() }, y: { scale: scaleBand() } }
		],
		expected: { x: [0, 3], y: ['0', '2', '3', '1'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 1, my: '1' },
				{ mx: 3, my: '3' },
				{ mx: 2, my: '2' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleSqrt() }, y: { scale: scalePoint(), sort: true } }
		],
		expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 1, my: '1' },
				{ mx: 3, my: '3' },
				{ mx: 2, my: '2' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleSqrt() }, y: { scale: scalePoint() } }
		],
		expected: { x: [0, 3], y: ['0', '1', '3', '2'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '1' },
				{ mx: 1, my: '0' },
				{ mx: 2, my: '2' },
				{ mx: 3, my: '3' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleSqrt() }, y: { scale: scalePoint(), sort: true } }
		],
		expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '1' },
				{ mx: 1, my: '0' },
				{ mx: 2, my: '2' },
				{ mx: 3, my: '3' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleSqrt(), sort: true }, y: { scale: scalePoint(), sort: true } }
		],
		expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 1, my: '1' },
				{ mx: 3, my: '3' },
				{ mx: 2, my: '2' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleLog(), sort: true }, y: { scale: scaleOrdinal(), sort: true } }
		],
		expected: { x: [0, 3], y: ['0', '1', '2', '3'] }
	},
	{
		args: [
			[
				{ mx: 0, my: '0' },
				{ mx: 1, my: '1' },
				{ mx: 3, my: '3' },
				{ mx: 2, my: '2' }
			],
			{ x: d => d.mx, y: d => d.my },
			{ x: { scale: scaleLog() }, y: { scale: scaleOrdinal() } }
		],
		expected: { x: [0, 3], y: ['0', '1', '3', '2'] }
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
