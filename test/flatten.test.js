/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/lib/flatten.js';

const name = 'flatten';

const tests = [
	{ args: [[0, 1]], expected: [0, 1] },
	{
		args: [
			[
				[0, 1],
				[2, 3]
			]
		],
		expected: [0, 1, 2, 3]
	},
	{
		args: [
			[
				[
					[0, 1],
					[2, 3]
				],
				[
					[4, 5],
					[6, 7]
				]
			]
		],
		expected: [
			[0, 1],
			[2, 3],
			[4, 5],
			[6, 7]
		]
	},
	{
		args: [
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 2 }
			]
		],
		expected: [
			{ x: 0, y: 1 },
			{ x: 1, y: 2 }
		]
	},
	{
		args: [
			[
				[
					{ x: 0, y: 1 },
					{ x: 1, y: 2 }
				],
				[
					{ x: 0, y: 1 },
					{ x: 1, y: 2 }
				]
			]
		],
		expected: [
			{ x: 0, y: 1 },
			{ x: 1, y: 2 },
			{ x: 0, y: 1 },
			{ x: 1, y: 2 }
		]
	},
	{
		args: [
			[
				[
					[0, 1],
					[2, 3]
				],
				[
					[0, 1],
					[2, 3]
				]
			]
		],
		expected: [
			[0, 1],
			[2, 3],
			[0, 1],
			[2, 3]
		]
	},
	{
		args: [
			[
				{
					key: 'foo',
					values: [
						{ x: 0, y: 1 },
						{ x: 1, y: 2 }
					]
				},
				{
					key: 'foo',
					values: [
						{ x: 1, y: 1 },
						{ x: 2, y: 2 }
					]
				}
			],
			(d) => d.values
		],
		expected: [
			{ x: 0, y: 1 },
			{ x: 1, y: 2 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 }
		]
	},
	{
		args: [
			[
				{
					key: 'foo',
					values: [
						{ x: 0, y: 1 },
						{ x: 1, y: 2 }
					]
				},
				{
					key: 'foo',
					values: [
						{ x: 1, y: 1 },
						{ x: 2, y: 2 }
					]
				}
			],
			'values'
		],
		expected: [
			{ x: 0, y: 1 },
			{ x: 1, y: 2 },
			{ x: 1, y: 1 },
			{ x: 2, y: 2 }
		]
	}
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
