/* globals describe it */
import * as assert from 'assert';
import { stackOrderAscending, stackOffsetSilhouette } from 'd3-shape';

import fn from '../src/lib/lib/stack.js';

const name = 'stack';

const data = [
	{ month: '2015-01-01', apples: 320, bananas: 480, cherries: 640, dates: 400 },
	{ month: '2015-02-01', apples: 640, bananas: 960, cherries: 740, dates: 500 },
	{ month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 920, dates: 600 },
	{ month: '2015-04-01', apples: 3840, bananas: 1920, cherries: 960, dates: 700 }
];

const data2 = [
	{ month: '2015-01-01', apples: [320], bananas: [480], cherries: [640], dates: [400] },
	{ month: '2015-02-01', apples: [640], bananas: [960], cherries: [740], dates: [500] },
	{ month: '2015-03-01', apples: [1600], bananas: [1440], cherries: [920], dates: [600] },
	{ month: '2015-04-01', apples: [3840], bananas: [1920], cherries: [960], dates: [700] }
];

const data3 = [
	{
		month: '2015-01-01',
		apples: { x: 320 },
		bananas: { x: 480 },
		cherries: { x: 640 },
		dates: { x: 400 }
	},
	{
		month: '2015-02-01',
		apples: { x: 640 },
		bananas: { x: 960 },
		cherries: { x: 740 },
		dates: { x: 500 }
	},
	{
		month: '2015-03-01',
		apples: { x: 1600 },
		bananas: { x: 1440 },
		cherries: { x: 920 },
		dates: { x: 600 }
	},
	{
		month: '2015-04-01',
		apples: { x: 3840 },
		bananas: { x: 1920 },
		cherries: { x: 960 },
		dates: { x: 700 }
	}
];

const tests = [
	{
		args: [data, ['apples', 'bananas', 'cherries', 'dates']],
		expected: [
			[
				[0, 320],
				[0, 640],
				[0, 1600],
				[0, 3840]
			],
			[
				[320, 800],
				[640, 1600],
				[1600, 3040],
				[3840, 5760]
			],
			[
				[800, 1440],
				[1600, 2340],
				[3040, 3960],
				[5760, 6720]
			],
			[
				[1440, 1840],
				[2340, 2840],
				[3960, 4560],
				[6720, 7420]
			]
		]
	},
	{
		args: [data2, ['apples', 'bananas', 'cherries', 'dates'], { value: (d, key) => d[key][0] }],
		expected: [
			[
				[0, 320],
				[0, 640],
				[0, 1600],
				[0, 3840]
			],
			[
				[320, 800],
				[640, 1600],
				[1600, 3040],
				[3840, 5760]
			],
			[
				[800, 1440],
				[1600, 2340],
				[3040, 3960],
				[5760, 6720]
			],
			[
				[1440, 1840],
				[2340, 2840],
				[3960, 4560],
				[6720, 7420]
			]
		]
	},
	{
		args: [data3, ['apples', 'bananas', 'cherries', 'dates'], { value: (d, key) => d[key].x }],
		expected: [
			[
				[0, 320],
				[0, 640],
				[0, 1600],
				[0, 3840]
			],
			[
				[320, 800],
				[640, 1600],
				[1600, 3040],
				[3840, 5760]
			],
			[
				[800, 1440],
				[1600, 2340],
				[3040, 3960],
				[5760, 6720]
			],
			[
				[1440, 1840],
				[2340, 2840],
				[3960, 4560],
				[6720, 7420]
			]
		]
	},
	{
		args: [
			data3,
			['apples', 'bananas', 'cherries', 'dates'],
			{
				value: (d, key) => d[key].x,
				order: stackOrderAscending,
				offset: stackOffsetSilhouette
			}
		],
		expected: [
			[
				[600, 920],
				[780, 1420],
				[680, 2280],
				[-130, 3710]
			],
			[
				[120, 600],
				[-180, 780],
				[-760, 680],
				[-2050, -130]
			],
			[
				[-520, 120],
				[-920, -180],
				[-1680, -760],
				[-3010, -2050]
			],
			[
				[-920, -520],
				[-1420, -920],
				[-2280, -1680],
				[-3710, -3010]
			]
		]
	}
];

const errorTests = [
	{
		args: [undefined],
		expected: /^TypeError: The first argument of stack\(\) must be an array or data object/
	},
	{
		args: [data],
		expected: /^TypeError: The second argument of stack\(\) must be an array of key names/
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
