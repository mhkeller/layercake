/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/utils/getTime.js';

const name = 'getTime';

const tests = [
	{ args: [0], expected: 0 },
	{ args: [[0, 1, 2]], expected: [0, 1, 2] },
	{ args: ['hello'], expected: 'hello' },
	{ args: [Infinity], expected: Infinity },
	{ args: [null], expected: null },
	{ args: [undefined], expected: undefined },
	{ args: [new Date(2020, 0, 1)], expected: 1577854800000 },
	{ args: [new Date(Date.UTC(2020, 0, 1))], expected: 1577836800000 }
];

describe(name, () => {
	tests.forEach((test) => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
