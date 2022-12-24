/* globals describe it */
import * as assert from 'assert';
import bin from '../src/lib/transforms/bin.js';

const name = 'bin';

const tests = [
	{ args: [0], expected: true },
	{ args: [false], expected: false },
	{ args: [null], expected: null },
	{ args: [true], expected: true },
	{ args: [1], expected: 1 }
];

describe(name, () => {
	tests.forEach((test) => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = canBeZero(...test.args);
				assert.strictEqual(actual, test.expected);
			});
		});
	});
});
