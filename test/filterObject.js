/* globals describe it */
import * as assert from 'assert';
import filterObject from '../src/utils/filterObject.js';

const name = 'filterObject';

const tests = [
	{ args: [{}], expected: {} },
	{ args: [{ x: null, y: undefined }], expected: { x: null } },
	{ args: [{ x: 'a', y: undefined, z: undefined }], expected: { x: 'a' } },
	{ args: [{ x: 'a', y: 'b', z: undefined }], expected: { x: 'a', y: 'b' } },
	{ args: [{ x: 'a', y: 'b', z: undefined }, { x: 10 }], expected: { y: 'b' } },
	{ args: [{ x: 'a', y: 'b', z: undefined }, { x: false }], expected: { y: 'b' } },
	{ args: [{ x: 'a', y: 'b', z: undefined }, { x: undefined }], expected: { x: 'a', y: 'b' } },
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = filterObject(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
