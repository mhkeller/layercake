/* globals describe it */
import * as assert from 'assert';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

import fn from '../../src/lib/settings/getDefaultRange.js';
import { DIMENSIONS } from '../../src/lib/settings/dimensions.js';

const dims = Object.fromEntries(DIMENSIONS.map(d => [d.name, d]));

// Independent copy of the default c palette – must match d3's schemeCategory10
const schemeCategory10 = [
	'#1f77b4',
	'#ff7f0e',
	'#2ca02c',
	'#d62728',
	'#9467bd',
	'#8c564b',
	'#e377c2',
	'#7f7f7f',
	'#bcbd22',
	'#17becf'
];

const defaultReverses = {
	x: false,
	y: true,
	z: false,
	r: false
};

const name = 'getDefaultRange';

const w = 900;
const h = 500;

function ctx(overrides = {}) {
	return { width: w, height: h, percentRange: false, scales: {}, ...overrides };
}

const tests = [
	// Defaults
	{ args: [dims.x, { reverse: defaultReverses.x, ctx: ctx() }], expected: [0, w] },
	{ args: [dims.y, { reverse: defaultReverses.y, ctx: ctx() }], expected: [h, 0] },
	{ args: [dims.z, { reverse: defaultReverses.z, ctx: ctx() }], expected: [0, w] },
	{ args: [dims.r, { reverse: defaultReverses.r, ctx: ctx() }], expected: [1, 25] },

	// Reverse it
	{ args: [dims.x, { reverse: !defaultReverses.x, ctx: ctx() }], expected: [w, 0] },
	{ args: [dims.y, { reverse: !defaultReverses.y, ctx: ctx() }], expected: [0, h] },
	{ args: [dims.z, { reverse: !defaultReverses.z, ctx: ctx() }], expected: [w, 0] },
	{ args: [dims.r, { reverse: !defaultReverses.r, ctx: ctx() }], expected: [25, 1] },

	// Set percent range
	{
		args: [dims.x, { reverse: defaultReverses.x, ctx: ctx({ percentRange: true }) }],
		expected: [0, 100]
	},
	{
		args: [dims.y, { reverse: defaultReverses.y, ctx: ctx({ percentRange: true }) }],
		expected: [100, 0]
	},
	{
		args: [dims.z, { reverse: defaultReverses.z, ctx: ctx({ percentRange: true }) }],
		expected: [0, 100]
	},
	{
		args: [dims.r, { reverse: defaultReverses.r, ctx: ctx({ percentRange: true }) }],
		expected: [0, 100]
	},

	// Reverse percent range
	{
		args: [dims.x, { reverse: !defaultReverses.x, ctx: ctx({ percentRange: true }) }],
		expected: [100, 0]
	},
	{
		args: [dims.y, { reverse: !defaultReverses.y, ctx: ctx({ percentRange: true }) }],
		expected: [0, 100]
	},
	{
		args: [dims.z, { reverse: !defaultReverses.z, ctx: ctx({ percentRange: true }) }],
		expected: [100, 0]
	},
	{
		args: [dims.r, { reverse: !defaultReverses.r, ctx: ctx({ percentRange: true }) }],
		expected: [100, 0]
	},

	// Set a manual default
	{ args: [dims.x, { range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.y, { range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.z, { range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.r, { range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },

	// Manual default overrides percentRange = true
	{
		args: [dims.x, { range: [-100, 100], ctx: ctx({ percentRange: true }) }],
		expected: [-100, 100]
	},
	{
		args: [dims.y, { range: [-100, 100], ctx: ctx({ percentRange: true }) }],
		expected: [-100, 100]
	},
	{
		args: [dims.z, { range: [-100, 100], ctx: ctx({ percentRange: true }) }],
		expected: [-100, 100]
	},
	{
		args: [dims.r, { range: [-100, 100], ctx: ctx({ percentRange: true }) }],
		expected: [-100, 100]
	},

	// Set a manual default, with reverse true, which should have no effect
	{ args: [dims.x, { reverse: true, range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.y, { reverse: true, range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.z, { reverse: true, range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },
	{ args: [dims.r, { reverse: true, range: [-100, 100], ctx: ctx() }], expected: [-100, 100] },

	// Functions receive the chart context
	{
		args: [dims.x, { range: ({ width }) => [0, width / 2], ctx: ctx() }],
		expected: [0, w / 2]
	},
	{
		args: [dims.y, { range: ({ height }) => [0, height / 2], ctx: ctx() }],
		expected: [0, h / 2]
	},
	{
		args: [dims.z, { range: ({ width }) => [0, width / 2], ctx: ctx() }],
		expected: [0, w / 2]
	},
	{
		args: [dims.r, { range: ({ width, height }) => [width / 2, height / 2], ctx: ctx() }],
		expected: [w / 2, h / 2]
	},

	// Functions, with reverse true, which should have no effect
	{
		args: [dims.x, { reverse: true, range: ({ width }) => [0, width / 2], ctx: ctx() }],
		expected: [0, w / 2]
	},
	{
		args: [dims.y, { reverse: true, range: ({ height }) => [0, height / 2], ctx: ctx() }],
		expected: [0, h / 2]
	},
	{
		args: [dims.z, { reverse: true, range: ({ width }) => [0, width / 2], ctx: ctx() }],
		expected: [0, w / 2]
	},
	{
		args: [
			dims.r,
			{ reverse: true, range: ({ width, height }) => [width / 2, height / 2], ctx: ctx() }
		],
		expected: [w / 2, h / 2]
	},

	// Nested dimensions read their parent scale's bandwidth
	// and fall back to the chart dimension without one
	{
		args: [dims.x2, { ctx: ctx({ scales: { x: scaleBand().range([0, w]).domain(['a', 'b']) } }) }],
		expected: [0, w / 2]
	},
	{ args: [dims.x2, { ctx: ctx() }], expected: [0, w] },
	{
		args: [dims.y2, { ctx: ctx({ scales: { y: scaleBand().range([0, h]).domain(['a', 'b']) } }) }],
		expected: [0, h / 2]
	},
	{ args: [dims.y2, { ctx: ctx() }], expected: [0, h] },

	// A parent without bandwidth still lends its units, so a nested dimension
	// never mixes percentages and pixels (#nested-range)
	{
		args: [
			dims.x2,
			{ ctx: ctx({ scales: { x: scaleLinear().range([0, 100]) }, percentRange: true }) }
		],
		expected: [0, 100]
	},
	{
		args: [
			dims.y2,
			{ ctx: ctx({ scales: { y: scaleLinear().range([100, 0]) }, percentRange: true }) }
		],
		expected: [0, 100]
	},
	// ...and with no parent at all it falls back to the chart in those same units
	{ args: [dims.x2, { ctx: ctx({ percentRange: true }) }], expected: [0, 100] },
	{ args: [dims.y2, { ctx: ctx({ percentRange: true }) }], expected: [0, 100] },
	// A parent whose range isn't a measurable span, like a color scale
	{
		args: [dims.x2, { ctx: ctx({ scales: { x: scaleOrdinal().range(['red', 'blue']) } }) }],
		expected: [0, w]
	},

	// Sibling scales are available to user-passed range functions
	{
		args: [
			dims.x2,
			{
				range: ({ scales }) => [0, scales.x.bandwidth() / 2],
				ctx: ctx({ scales: { x: scaleBand().range([0, w]).domain(['a', 'b']) } })
			}
		],
		expected: [0, w / 4]
	},

	// Color dimensions: c defaults to the categorical palette, c2 to an
	// opacity-style [0, 1] – and percentRange applies to neither
	{ args: [dims.c, { ctx: ctx() }], expected: schemeCategory10 },
	{ args: [dims.c, { ctx: ctx({ percentRange: true }) }], expected: schemeCategory10 },
	{ args: [dims.c, { range: ['#fc0', '#c0f'], ctx: ctx() }], expected: ['#fc0', '#c0f'] },
	{ args: [dims.c2, { ctx: ctx() }], expected: [0, 1] }
];

describe(name, () => {
	tests.forEach(test => {
		describe(`${test.args[0].name} ${JSON.stringify(test.args[1])}`, () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = fn(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
