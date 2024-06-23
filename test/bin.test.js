/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/lib/bin.js';

const name = 'bin';

const data = [
	{ myX: 0 },
	{ myX: 1 },
	{ myX: 2 },
	{ myX: 4 },
	{ myX: 2 },
	{ myX: 8 },
	{ myX: 1 },
	{ myX: 4 },
	{ myX: 7 }
];

const tests = [
	{
		args: [data.map(d => d.myX)],
		expected: [[0, 1, 1], [2, 2], [4, 4], [7], [8]]
	},
	{
		args: [data, 'myX'],
		expected: [
			[{ myX: 0 }, { myX: 1 }, { myX: 1 }],
			[{ myX: 2 }, { myX: 2 }],
			[{ myX: 4 }, { myX: 4 }],
			[{ myX: 7 }],
			[{ myX: 8 }]
		]
	},
	{
		args: [data, d => d.myX],
		expected: [
			[{ myX: 0 }, { myX: 1 }, { myX: 1 }],
			[{ myX: 2 }, { myX: 2 }],
			[{ myX: 4 }, { myX: 4 }],
			[{ myX: 7 }],
			[{ myX: 8 }]
		]
	},
	{
		args: [data, d => d.myX, { domain: [0, 6] }],
		expected: [
			[{ myX: 0 }],
			[{ myX: 1 }, { myX: 1 }],
			[{ myX: 2 }, { myX: 2 }],
			[],
			[{ myX: 4 }, { myX: 4 }],
			[]
		]
	},
	{
		args: [data, d => d.myX, { thresholds: [0, 3, 7] }],
		expected: [
			[{ myX: 0 }, { myX: 1 }, { myX: 2 }, { myX: 2 }, { myX: 1 }],
			[{ myX: 4 }, { myX: 4 }],
			[{ myX: 8 }, { myX: 7 }]
		]
	}
];

const errorTests = [
	{
		args: [undefined],
		expected: /^TypeError: The first argument of bin\(\) must be an array or data object/
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = JSON.parse(JSON.stringify(fn(...test.args)));
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});

	errorTests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should throw error ${test.expected}`, () => {
				const actual = () => fn(...test.args);
				assert.throws(actual, test.expected);
			});
		});
	});
});
