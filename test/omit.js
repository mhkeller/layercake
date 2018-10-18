/* globals describe it */
import omit from '../src/utils/omit.js';
import * as assert from 'assert';

const name = 'omit';

const tests = [
	{ args: [{}, ['x']], expected: {} },
	{ args: [{x: 1, y: 2}, ['x']], expected: {y: 2} },
	{ args: [{x: 1, y: 2, z: 3}, ['x', 'z']], expected: {y: 2} },
	{ args: [{x: 1, y: 2, z: 3}], expected: {x: 1, y: 2, z: 3} }
];

describe(name, function () {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = omit(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
