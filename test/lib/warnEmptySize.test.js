/* globals describe it beforeEach afterEach */
import * as assert from 'assert';

import warnEmptySize from '../../src/lib/helpers/warnEmptySize.js';

const realWarn = console.warn;

/** @type {Array<string>} */
let warnings = [];

describe('warnEmptySize', () => {
	beforeEach(() => {
		warnings = [];
		console.warn = (/** @type {any} */ message) => warnings.push(String(message));
	});

	afterEach(() => {
		console.warn = realWarn;
	});

	it('says nothing about a chart that has room to draw in', () => {
		warnEmptySize(900, 500);
		assert.deepStrictEqual(warnings, []);
	});

	it('names the width when the width is gone', () => {
		warnEmptySize(0, 500);
		assert.strictEqual(warnings.length, 1);
		assert.match(warnings[0], /zero or negative width/);
	});

	it('names the height when the height is gone', () => {
		warnEmptySize(900, -20);
		assert.strictEqual(warnings.length, 1);
		assert.match(warnings[0], /zero or negative height/);
	});

	it('names both when the container has no size at all', () => {
		warnEmptySize(0, 0);
		assert.strictEqual(warnings.length, 2);
	});
});
