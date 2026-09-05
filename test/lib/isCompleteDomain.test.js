/* globals describe it */
import * as assert from 'assert';

import fn from '../../src/lib/utils/isCompleteDomain.js';

const name = 'isCompleteDomain';

const tests = [
	{ args: [[0, 10]], expected: true },
	{ args: [['a', 'b', 'c']], expected: true },
	{ args: [[0, 5, 10]], expected: true },
	{ args: [undefined], expected: false },
	{ args: [() => [0, 10]], expected: false },
	{ args: [[null, 10]], expected: false },
	{ args: [[0, null]], expected: false },
	{ args: [[]], expected: false },
	{ args: [[undefined, 10]], expected: false },
	{ args: [[0, undefined]], expected: false }
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
