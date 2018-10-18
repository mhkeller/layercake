/* globals describe it */
import partialDomain from '../src/utils/partialDomain.js';
import * as assert from 'assert';

const name = 'partialDomain';

const tests = [
	{ args: [[0, 1]], expected: [0, 1] },
	{ args: [[0, 1], [null, null]], expected: [0, 1] },
	{ args: [[0, 1], [-1, null]], expected: [-1, 1] },
	{ args: [[0, 1], [null, 2]], expected: [0, 2] }
];

describe(name, function () {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = partialDomain(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
