/* globals describe it */
import * as assert from 'assert';
import fn from '../../src/lib/utils/processCsvValue.js';

const name = 'processCsvValue';

const tests = [
	{ args: [''], expected: '' },
	{ args: ['foo'], expected: 'foo' },
	{ args: ['2018-07-22T22:25:55Z'], expected: '2018-07-22T22:25:55Z' },
	{ args: ['1.23'], expected: 1.23 },
	{ args: ['42'], expected: 42 }
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(test.args[0]);
				assert.strictEqual(actual, test.expected);
			});
		});
	});
});
