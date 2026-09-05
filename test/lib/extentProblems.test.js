/* globals describe it */
import * as assert from 'assert';

import extentProblems from '../../src/lib/helpers/extentProblems.js';

describe('extentProblems', () => {
	it('a healthy numeric extent has no problem', () => {
		assert.strictEqual(extentProblems([0, 10], 5), null);
	});

	// A typo'd accessor key returns undefined for every row, so nothing measures
	it("reports 'empty' when rows measured nothing", () => {
		assert.strictEqual(extentProblems([null, null], 5), 'empty');
	});

	it('an empty dataset measures nothing without that being a problem', () => {
		assert.strictEqual(extentProblems([null, null], 0), null);
	});

	// Unparsed CSV numbers compare alphabetically ('9' > '10')
	it("reports 'strings' when either endpoint is a string", () => {
		assert.strictEqual(extentProblems(['1', '9'], 5), 'strings');
		assert.strictEqual(extentProblems([0, '9'], 5), 'strings');
	});

	it('dates are not a problem', () => {
		assert.strictEqual(extentProblems([new Date(2020, 0), new Date(2021, 0)], 5), null);
	});
});
