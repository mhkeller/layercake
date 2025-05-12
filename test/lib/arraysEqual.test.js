/* globals describe it */
import * as assert from 'assert';
import fn from '../../src/lib/utils/arraysEqual.js';

const name = 'arraysEqual';

const tests = [
	{ args: [[], [0]], expected: false },
	{ args: [[0], ['0']], expected: false },
	{ args: [[0], [0]], expected: true },
	{
		args: [
			['a', 'b', 'c', 'd'],
			['a', 'b', 'c', 'd']
		],
		expected: true
	},
	{
		args: [
			['a', 'b', 'c', 'd'],
			['d', 'b', 'a', 'c']
		],
		expected: true
	},
	{
		args: [
			['a', 'b', 'c', 'd'],
			['d', 'a', 'a', 'c']
		],
		expected: false
	},
	{
		args: [
			['a', 'b', 'c', 'd'],
			['a', 'b', 'b', 'c', 'd']
		],
		expected: false
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.strictEqual(actual, test.expected);
			});
		});
	});
});
