/* globals describe it */
import getActiveKeys from '../src/utils/getActiveKeys.js';
import * as assert from 'assert';

const name = 'getActiveKeys';

const tests = [
	{ args: [{x: 0, y: 1, r: d => d}], expected: ['x', 'y', 'r'] },
	{ args: [{x: 0}], expected: ['x'] },
	{ args: [{x: [0], y: 0}], expected: ['x', 'y'] },
	{ args: [{x: null, y: false}], expected: [] },
	{ args: [{q: 1}], expected: [] }
];

describe(name, function () {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = getActiveKeys(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
