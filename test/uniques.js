/* globals describe it */
import * as assert from 'assert';
import uniques from '../src/lib/lib/uniques.js';

const name = 'uniques';

const tests = [
	{ args: [0], expected: null },
	{ args: [[0]], expected: [0] },
	{ args: [[0, 0, 1]], expected: [0, 1] },
	{ args: [['a', 'b', 'b', 'c']], expected: ['a', 'b', 'c'] },
	{ args: [['a', 1, 'b', 1]], expected: ['a', 1, 'b'] },
	{
		args: [
			[{ x: 1, b: 2 }, { x: 1, b: 3 }, { x: 2, b: 4 }],
			'x',
			false
		],
		expected: [{ x: 1, b: 2 }, { x: 2, b: 4 }]
	},
	{
		args: [
			[{ x: 1, b: 2 }, { x: 1, b: 3 }, { x: 2, b: 4 }],
			'x'
		],
		expected: [1, 2]
	},
	{
		args: [
			[{ x: 1, b: 2 }, { x: 1, b: 3 }, { x: 2, b: 4 }],
			d => d.x
		],
		expected: [1, 2]
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = uniques(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
