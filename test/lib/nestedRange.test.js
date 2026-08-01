/* globals describe it */
import * as assert from 'assert';
import { scaleBand, scaleLinear, scaleOrdinal, scalePoint } from 'd3-scale';

import nestedRange from '../../src/lib/helpers/nestedRange.js';

const chartSpan = 900;

const tests = [
	// A band or point parent hands over one slot directly
	{
		note: 'band parent gives its bandwidth',
		args: [scaleBand().range([0, 900]).domain(['a', 'b', 'c']), chartSpan],
		expected: [0, 300]
	},
	{
		note: 'point parent gives its bandwidth, which is zero',
		args: [scalePoint().range([0, 900]).domain(['a', 'b']), chartSpan],
		expected: [0, 0]
	},

	// Anything else lends its units via the span of its range – this is what
	// keeps a nested dimension out of pixels on a percentRange chart
	{
		note: 'continuous pixel parent',
		args: [scaleLinear().range([0, 640]), chartSpan],
		expected: [0, 640]
	},
	{
		note: 'continuous percent parent',
		args: [scaleLinear().range([0, 100]), chartSpan],
		expected: [0, 100]
	},
	{
		note: 'reversed parent still reports a positive span',
		args: [scaleLinear().range([100, 0]), chartSpan],
		expected: [0, 100]
	},
	{
		note: 'piecewise parent measures end to end',
		args: [scaleLinear().range([0, 30, 90]), chartSpan],
		expected: [0, 90]
	},

	// Nothing measurable to nest inside, so fill the chart
	{ note: 'no parent at all', args: [undefined, chartSpan], expected: [0, chartSpan] },
	{
		note: 'parent whose range is colors, not a span',
		args: [scaleOrdinal().range(['red', 'blue']), chartSpan],
		expected: [0, chartSpan]
	},
	{
		note: 'parent with an empty range',
		args: [scaleOrdinal(), chartSpan],
		expected: [0, chartSpan]
	},
	{
		note: 'something that is not a scale',
		args: [{ notAScale: true }, chartSpan],
		expected: [0, chartSpan]
	}
];

describe('nestedRange', () => {
	tests.forEach(test => {
		it(`${test.note} should equal ${JSON.stringify(test.expected)}`, () => {
			assert.deepStrictEqual(nestedRange(...test.args), test.expected);
		});
	});
});
