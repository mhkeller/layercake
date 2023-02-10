/* globals describe it */
import * as assert from 'assert';

import fn from '../src/lib/utils/partialDomain.js';

const name = 'partialDomain';

const tests = [
	{ args: [[0, 1]], expected: [0, 1] },
	{ args: [[0, 1], [null, null]], expected: [0, 1] },
	{ args: [[0, 1], [-1, null]], expected: [-1, 1] },
	{ args: [[0, 1], [null, 2]], expected: [0, 2] }
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
