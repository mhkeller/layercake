/* globals describe it */
import * as assert from 'assert';
import makeAccessor from '../src/utils/makeAccessor.js';

const name = 'makeAccessor';

const tests = [
	{ args: [], expected: null },
	{ args: [0], input: ['a', 'b'], expected: d => d[0], expectedOutput: 'a' },
	{ args: [1], input: ['a', 'b'], expected: d => d[1], expectedOutput: 'b' },
	{ args: [d => d[0]], input: ['a', 'b'], expected: d => d[0], expectedOutput: 'a' },
	{ args: [d => d.x], input: {x: 1}, expected: d => d.x, expectedOutput: 1 },
	{ args: [['x0', 'x1']], input: {x0: 0, x1: 1}, expected: d => ['x0', 'x1'].map(k => d[k]), expectedOutput: [0, 1] },
	{ args: [[d => d.x0, d => d.x1]], input: {x0: 0, x1: 1}, expected: d => [d => d.x0, d => d.x1].map(k => k(d)), expectedOutput: [0, 1] }
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${test.expected ? test.expected.toString() : JSON.stringify(test.expected)}`, () => {
				const actual = makeAccessor(...test.args);
				if (typeof test.expected === 'function') {
					assert.deepStrictEqual(actual(test.input), test.expected(test.input));
					assert.deepStrictEqual(actual(test.input), test.expectedOutput);
				} else {
					assert.strictEqual(actual, test.expected);
				}
			});
		});
	});
});
