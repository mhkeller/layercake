/* globals describe it */
import * as assert from 'assert';
import fn from '../src/lib/lib/groupLonger.js';

const name = 'groupLonger';

const data = [
	{ month: '2015-01-01', apples: 320, bananas: 480, cherries: 640, dates: 400 },
	{ month: '2015-02-01', apples: 640, bananas: 960, cherries: 740, dates: 500 },
	{ month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 960, dates: 600 }
];

const tests = [
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates']],
		expected: [
			{
				group: 'apples',
				values: [
					{ month: '2015-01-01', value: 320, group: 'apples' },
					{ month: '2015-02-01', value: 640, group: 'apples' },
					{ month: '2015-03-01', value: 1600, group: 'apples' }
				]
			},
			{
				group: 'bananas',
				values: [
					{ month: '2015-01-01', value: 480, group: 'bananas' },
					{ month: '2015-02-01', value: 960, group: 'bananas' },
					{ month: '2015-03-01', value: 1440, group: 'bananas' }
				]
			},
			{
				group: 'cherries',
				values: [
					{ month: '2015-01-01', value: 640, group: 'cherries' },
					{ month: '2015-02-01', value: 740, group: 'cherries' },
					{ month: '2015-03-01', value: 960, group: 'cherries' }
				]
			},
			{
				group: 'dates',
				values: [
					{ month: '2015-01-01', value: 400, group: 'dates' },
					{ month: '2015-02-01', value: 500, group: 'dates' },
					{ month: '2015-03-01', value: 600, group: 'dates' }
				]
			}
		]
	},
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates'], { groupTo: 'key' }],
		expected: [
			{
				key: 'apples',
				values: [
					{ month: '2015-01-01', value: 320, key: 'apples' },
					{ month: '2015-02-01', value: 640, key: 'apples' },
					{ month: '2015-03-01', value: 1600, key: 'apples' }
				]
			},
			{
				key: 'bananas',
				values: [
					{ month: '2015-01-01', value: 480, key: 'bananas' },
					{ month: '2015-02-01', value: 960, key: 'bananas' },
					{ month: '2015-03-01', value: 1440, key: 'bananas' }
				]
			},
			{
				key: 'cherries',
				values: [
					{ month: '2015-01-01', value: 640, key: 'cherries' },
					{ month: '2015-02-01', value: 740, key: 'cherries' },
					{ month: '2015-03-01', value: 960, key: 'cherries' }
				]
			},
			{
				key: 'dates',
				values: [
					{ month: '2015-01-01', value: 400, key: 'dates' },
					{ month: '2015-02-01', value: 500, key: 'dates' },
					{ month: '2015-03-01', value: 600, key: 'dates' }
				]
			}
		]
	},
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates'], { groupTo: 'key', valueTo: 'v' }],
		expected: [
			{
				key: 'apples',
				values: [
					{ month: '2015-01-01', v: 320, key: 'apples' },
					{ month: '2015-02-01', v: 640, key: 'apples' },
					{ month: '2015-03-01', v: 1600, key: 'apples' }
				]
			},
			{
				key: 'bananas',
				values: [
					{ month: '2015-01-01', v: 480, key: 'bananas' },
					{ month: '2015-02-01', v: 960, key: 'bananas' },
					{ month: '2015-03-01', v: 1440, key: 'bananas' }
				]
			},
			{
				key: 'cherries',
				values: [
					{ month: '2015-01-01', v: 640, key: 'cherries' },
					{ month: '2015-02-01', v: 740, key: 'cherries' },
					{ month: '2015-03-01', v: 960, key: 'cherries' }
				]
			},
			{
				key: 'dates',
				values: [
					{ month: '2015-01-01', v: 400, key: 'dates' },
					{ month: '2015-02-01', v: 500, key: 'dates' },
					{ month: '2015-03-01', v: 600, key: 'dates' }
				]
			}
		]
	},
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates'], { valueTo: 'v' }],
		expected: [
			{
				group: 'apples',
				values: [
					{ month: '2015-01-01', v: 320, group: 'apples' },
					{ month: '2015-02-01', v: 640, group: 'apples' },
					{ month: '2015-03-01', v: 1600, group: 'apples' }
				]
			},
			{
				group: 'bananas',
				values: [
					{ month: '2015-01-01', v: 480, group: 'bananas' },
					{ month: '2015-02-01', v: 960, group: 'bananas' },
					{ month: '2015-03-01', v: 1440, group: 'bananas' }
				]
			},
			{
				group: 'cherries',
				values: [
					{ month: '2015-01-01', v: 640, group: 'cherries' },
					{ month: '2015-02-01', v: 740, group: 'cherries' },
					{ month: '2015-03-01', v: 960, group: 'cherries' }
				]
			},
			{
				group: 'dates',
				values: [
					{ month: '2015-01-01', v: 400, group: 'dates' },
					{ month: '2015-02-01', v: 500, group: 'dates' },
					{ month: '2015-03-01', v: 600, group: 'dates' }
				]
			}
		]
	},
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates'], { keepKeys: ['month', 'dates'] }],
		expected: [
			{
				group: 'apples',
				values: [
					{
						month: '2015-01-01',
						dates: 400,
						value: 320,
						group: 'apples'
					},
					{
						month: '2015-02-01',
						dates: 500,
						value: 640,
						group: 'apples'
					},
					{
						month: '2015-03-01',
						dates: 600,
						value: 1600,
						group: 'apples'
					}
				]
			},
			{
				group: 'bananas',
				values: [
					{
						month: '2015-01-01',
						dates: 400,
						value: 480,
						group: 'bananas'
					},
					{
						month: '2015-02-01',
						dates: 500,
						value: 960,
						group: 'bananas'
					},
					{
						month: '2015-03-01',
						dates: 600,
						value: 1440,
						group: 'bananas'
					}
				]
			},
			{
				group: 'cherries',
				values: [
					{
						month: '2015-01-01',
						dates: 400,
						value: 640,
						group: 'cherries'
					},
					{
						month: '2015-02-01',
						dates: 500,
						value: 740,
						group: 'cherries'
					},
					{
						month: '2015-03-01',
						dates: 600,
						value: 960,
						group: 'cherries'
					}
				]
			},
			{
				group: 'dates',
				values: [
					{
						month: '2015-01-01',
						dates: 400,
						value: 400,
						group: 'dates'
					},
					{
						month: '2015-02-01',
						dates: 500,
						value: 500,
						group: 'dates'
					},
					{
						month: '2015-03-01',
						dates: 600,
						value: 600,
						group: 'dates'
					}
				]
			}
		]
	}
];

const errorTests = [
	{
		args: [undefined],
		expected: /^TypeError: The first argument of groupLonger\(\) must be an array of data/
	},
	{
		args: [data],
		expected: /^TypeError: The second argument of groupLonger\(\) must be an array of key names/
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

	errorTests.forEach((test) => {
		describe(JSON.stringify(test.args), () => {
			it(`should throw error ${test.expected}`, () => {
				const actual = () => fn(...test.args);
				assert.throws(actual, test.expected);
			});
		});
	});
});
