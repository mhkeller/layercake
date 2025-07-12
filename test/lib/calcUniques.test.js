/* globals describe it */
import * as assert from 'assert';
import fn from '../../src/lib/lib/calcUniques.js';

const name = 'calcUniques';

const tests = [
	{ args: [[0, 1, 2], {}], expected: {} },
	{
		args: [[undefined, null, NaN, false, NaN, null], { x: d => d }],
		expected: { x: [undefined, null, NaN, false] }
	},
	{
		args: [
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 }
			],
			{ x: d => d.x }
		],
		expected: { x: [0, 1, 2, 3, 4] }
	},
	{
		args: [
			[
				{},
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 },
				{ x: 4, y: 5 }
			],
			{ x: d => d.x }
		],
		expected: { x: [undefined, 0, 1, 2, 3, 4] }
	},
	{
		args: [
			[{ x: null }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
			{ x: d => d.x, y: d => d.y }
		],
		expected: { x: [null, 0, 1, 2, 3, 4], y: [undefined, 1, 2, 3, 4, 5] }
	},
	{
		args: [
			[
				{ x: 'd' / 1 },
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 }
			],
			{ x: d => d.x }
		],
		expected: { x: [NaN, 0, 1, 2, 3, 4] }
	},
	{
		args: [
			[{ x: NaN }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
			{ x: d => d.x }
		],
		expected: { x: [NaN, 0, 1, 2, 3, 4] }
	},
	{
		args: [
			[
				{ x: Number.NaN },
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 }
			],
			{ x: d => d.x }
		],
		expected: { x: [Number.NaN, 0, 1, 2, 3, 4] }
	},
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-05' },
				{ x: '2010-01-06' }
			],
			{ x: d => d.x }
		],
		expected: { x: ['2010-01-04', '2010-01-02', '2010-01-05', '2010-01-06'] }
	},
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-05' },
				{ x: '2010-01-06' }
			],
			{ x: d => d.x },
			{ sort: true }
		],
		expected: { x: ['2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'] }
	},
	{
		args: [
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 }
			],
			{ x: d => d.x, y: d => d.y }
		],
		expected: { x: [0, 1, 2, 3, 4], y: [1, 2, 3, 4, 5] }
	},
	{
		args: [
			[
				{ x: [-4, 0], y: [1, 6] },
				{ x: [-5, 1], y: [2, 7] },
				{ x: [-3, 2], y: [3, 8] },
				{ x: [-2, 3], y: [4, 9] },
				{ x: [-1, 4], y: [5, 10] },
				{ x: [-3, 2], y: [6, 1] },
				{ x: [-4, 4], y: [2, 8] }
			],
			{ x: d => d.x, y: d => d.y }
		],
		expected: { x: [-4, 0, -5, 1, -3, 2, -2, 3, -1, 4], y: [1, 6, 2, 7, 3, 8, 4, 9, 5, 10] }
	},
	{
		args: [
			[
				{ x: [-4, 0], y: [1, 6] },
				{ x: [-5, 1], y: [2, 7] },
				{ x: [-3, 2], y: [3, 8] },
				{ x: [-2, 3], y: [4, 9] },
				{ x: [-1, 4], y: [5, 10] },
				{ x: [-3, 2], y: [6, 1] },
				{ x: [-4, 4], y: [2, 8] }
			],
			{ x: d => d.x, y: d => d.y },
			{ x: true, y: true }
		],
		expected: { x: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4], y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
	},
	{
		args: [
			[
				{ x: [-4, 0], y: [1, 6] },
				{ x: [-5, 1], y: [2, 7] },
				{ x: [-3, 2], y: [3, 8] },
				{ x: [-2, 3], y: [4, 9] },
				{ x: [-1, 4], y: [5, 10] },
				{ x: [-3, 2], y: [6, 1] },
				{ x: [-4, 4], y: [2, 8] }
			],
			{ x: d => d.x, y: d => d.y },
			{ sort: true }
		],
		expected: { x: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4], y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
	},
	{
		args: [
			[
				{ start: 0, end: 1 },
				{ start: -10000, end: 0 }
			],
			{ y: d => [d.start, d.end] }
		],
		expected: { y: [0, 1, -10000] }
	},
	{
		args: [
			[
				{ teamCity: 'New York', backupCity: 'Los Angeles' },
				{ teamCity: 'Chicago', backupCity: 'Seattle' }
			],
			{ y: d => [d.teamCity, d.backupCity] }
		],
		expected: { y: ['New York', 'Los Angeles', 'Chicago', 'Seattle'] }
	},
	// empty sort options
	{
		args: [
			[
				{ teamCity: 'New York', backupCity: 'Los Angeles' },
				{ teamCity: 'Chicago', backupCity: 'Seattle' }
			],
			{ y: d => [d.teamCity, d.backupCity] },
			{}
		],
		expected: { y: ['New York', 'Los Angeles', 'Chicago', 'Seattle'] }
	},
	// sort true
	{
		args: [
			[
				{ teamCity: 'New York', backupCity: 'Los Angeles' },
				{ teamCity: 'Chicago', backupCity: 'Seattle' }
			],
			{ y: d => [d.teamCity, d.backupCity] },
			{ y: true }
		],
		expected: { y: ['Chicago', 'Los Angeles', 'New York', 'Seattle'] }
	},
	{
		args: [
			[
				{ teamCity: 'New York', backupCity: 'Los Angeles' },
				{ teamCity: 'Chicago', backupCity: 'Seattle' }
			],
			{ y: d => [d.teamCity, d.backupCity] },
			{ sort: true }
		],
		expected: { y: ['Chicago', 'Los Angeles', 'New York', 'Seattle'] }
	},
	{
		args: [
			[
				{ teamCity: 'New York', backupCity: 'Los Angeles' },
				{ teamCity: 'Chicago', backupCity: 'Seattle' }
			],
			{ y: d => [d.teamCity, d.backupCity] },
			{ sort: false }
		],
		expected: { y: ['New York', 'Los Angeles', 'Chicago', 'Seattle'] }
	},
	// sort true numbers
	{
		args: [[0, 10, 11, 1, 2, -1, -10, 4, 2, 4, 5, 6, 7, 7, 0], { x: d => d }, { x: true }],
		expected: { x: [-10, -1, 0, 1, 2, 4, 5, 6, 7, 10, 11] }
	},
	{
		args: [[0, 10, 11, 1, 2, -1, -10, 4, 2, 4, 5, 6, 7, 7, 0], { x: d => d }, { sort: true }],
		expected: { x: [-10, -1, 0, 1, 2, 4, 5, 6, 7, 10, 11] }
	},
	// sort true dates as strings
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-06' },
				{ x: '2010-01-05' }
			],
			{ x: d => d.x },
			{ x: true }
		],
		expected: { x: ['2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'] }
	},
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-06' },
				{ x: '2010-01-05' }
			],
			{ x: d => d.x },
			{ sort: true }
		],
		expected: { x: ['2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'] }
	},
	// sort true dates as dates
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-06' },
				{ x: '2010-01-05' }
			].map(d => ({ x: new Date(d.x) })),
			{ x: d => d.x },
			{ x: true }
		],
		expected: {
			x: ['2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'].map(d => new Date(d))
		}
	},
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-06' },
				{ x: '2010-01-05' }
			].map(d => ({ x: new Date(d.x) })),
			{ x: d => d.x },
			{ sort: true }
		],
		expected: {
			x: ['2010-01-02', '2010-01-04', '2010-01-05', '2010-01-06'].map(d => new Date(d))
		}
	},
	// arrays of dates
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			].map(d => ({ x: d.x.map(q => new Date(q)) })),
			{ x: d => d.x },
			{ x: true }
		],
		expected: {
			x: [
				'2010-01-02',
				'2010-01-04',
				'2010-01-05',
				'2010-01-06',
				'2010-02-02',
				'2010-02-04',
				'2010-02-05',
				'2010-02-06'
			].map(d => new Date(d))
		}
	},
	// arrays of dates sort false
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			].map(d => ({ x: d.x.map(q => new Date(q)) })),
			{ x: d => d.x }
		],
		expected: {
			x: [
				'2010-01-04',
				'2010-02-04',
				'2010-01-02',
				'2010-02-02',
				'2010-01-06',
				'2010-02-06',
				'2010-01-05',
				'2010-02-05'
			].map(d => new Date(d))
		}
	},
	// arrays of dates as strings sort false
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			],
			{ x: d => d.x }
		],
		expected: {
			x: [
				'2010-01-04',
				'2010-02-04',
				'2010-01-02',
				'2010-02-02',
				'2010-01-06',
				'2010-02-06',
				'2010-01-05',
				'2010-02-05'
			]
		}
	},
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			],
			{ x: d => d.x },
			{ sort: false }
		],
		expected: {
			x: [
				'2010-01-04',
				'2010-02-04',
				'2010-01-02',
				'2010-02-02',
				'2010-01-06',
				'2010-02-06',
				'2010-01-05',
				'2010-02-05'
			]
		}
	},
	// arrays of dates as strings sort true
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			],
			{ x: d => d.x },
			{ x: true }
		],
		expected: {
			x: [
				'2010-01-02',
				'2010-01-04',
				'2010-01-05',
				'2010-01-06',
				'2010-02-02',
				'2010-02-04',
				'2010-02-05',
				'2010-02-06'
			]
		}
	},
	{
		args: [
			[
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-02', '2010-02-02'] },
				{ x: ['2010-01-04', '2010-02-04'] },
				{ x: ['2010-01-06', '2010-02-06'] },
				{ x: ['2010-01-05', '2010-02-05'] }
			],
			{ x: d => d.x },
			{ sort: true }
		],
		expected: {
			x: [
				'2010-01-02',
				'2010-01-04',
				'2010-01-05',
				'2010-01-06',
				'2010-02-02',
				'2010-02-04',
				'2010-02-05',
				'2010-02-06'
			]
		}
	},
	// dates
	{
		args: [
			[
				{ x: '2010-01-04' },
				{ x: '2010-01-02' },
				{ x: '2010-01-04' },
				{ x: '2010-01-06' },
				{ x: '2010-01-05' }
			].map(d => ({ x: new Date(d.x) })),
			{ x: d => d.x }
		],
		expected: {
			x: ['2010-01-04', '2010-01-02', '2010-01-06', '2010-01-05'].map(d => new Date(d))
		}
	}
];

const errorTests = [
	{
		args: [[]],
		expected:
			/^TypeError: The second argument of calcUniques\(\) must be an object with field names as keys as accessor functions as values\.$/
	},
	{
		// Old-style API with array of objects as second argument
		args: [
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 3 },
				{ x: 3, y: 4 },
				{ x: 4, y: 5 }
			],
			[{ field: 'x', accessor: d => d.x }]
		],
		expected:
			/^TypeError: The second argument of calcUniques\(\) must be an object with field names as keys as accessor functions as values.$/
	},
	{
		args: [{}],
		expected:
			/^TypeError: The first argument of calcUniques\(\) must be an array\. You passed in a object.*/
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it('should not modify data passed to calcUniques()', () => {
				const dataBeforeCall = test.args[0];
				fn(...test.args);
				const dataAfterCall = test.args[0];
				assert.deepStrictEqual(dataBeforeCall, dataAfterCall);
			});
		});
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
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
