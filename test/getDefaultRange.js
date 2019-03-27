/* globals describe it */
import getDefaultRange from '../src/settings/getDefaultRange.js';
import * as assert from 'assert';

const name = 'getDefaultRange';

const width = 900;
const height = 500;

const tests = [
	/* --------------------------------------------
	 * Defaults
	 */
	{ args: ['x', { }, width, height], expected: [0, width] },
	{ args: ['y', { }, width, height], expected: [0, height] },
	{ args: ['r', { }, width, height], expected: [1, 25] },
	/* --------------------------------------------
	 * Reverse it
	 */
	{ args: ['x', { reverseX: true }, width, height], expected: [width, 0] },
	{ args: ['y', { reverseY: true }, width, height], expected: [height, 0] },
	/* --------------------------------------------
	 * Set a manual default
	 */
	{ args: ['x', { xRange: [-100, 100] }, width, height], expected: [-100, 100] },
	{ args: ['y', { yRange: [-100, 100] }, width, height], expected: [-100, 100] },
	{ args: ['r', { rRange: [-100, 100] }, width, height], expected: [-100, 100] },
	/* --------------------------------------------
	 * Functions!
	 */
	{ args: ['x', { xRange: ({ width, height }) => [0, width / 2] }, width, height], expected: [0, width / 2] },
	{ args: ['y', { yRange: ({ width, height }) => [0, height / 2] }, width, height], expected: [0, height / 2] },
	{ args: ['r', { rRange: ({ width, height }) => [width / 2, height / 2] }, width, height], expected: [width / 2, height / 2] }
];

describe(name, function () {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = getDefaultRange(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
