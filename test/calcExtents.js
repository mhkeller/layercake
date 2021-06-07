/* globals describe it */
import * as assert from 'assert';
import calcExtents from '../src/lib/calcExtents.js';

const name = 'calcExtents';

const tests = [
	{ args: [[]], expected: {} },
	{ args: [{}], expected: {} },
	{ args: [[0, 1, 2], []], expected: {} },
	{ args: [[undefined, null, NaN], [{ field: 'x', accessor: d => d }]], expected: { x: [null, null] } },
	{
		args: [[
			{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{}, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{ x: null }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{ x: 'd' / 1 }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{ x: NaN }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{ x: Number.NaN }, { x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: [0, 4] }
	},
	{
		args: [[
			{ x: '2010-01-04' }, { x: '2010-01-02' }, { x: '2010-01-04' }, { x: '2010-01-05' }, { x: '2010-01-06' }
		], [{ field: 'x', accessor: d => d.x }]],
		expected: { x: ['2010-01-02', '2010-01-06'] }
	},
	{
		args: [[
			{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }
		], [{ field: 'x', accessor: d => d.x }, { field: 'y', accessor: d => d.y }]],
		expected: { x: [0, 4], y: [1, 5] }
	},
	{
		args: [[
			{ x: [-4, 0], y: [1, 6] }, { x: [-5, 1], y: [2, 7]}, { x: [-3, 2], y: [3, 8] }, { x: [-2, 3], y: [4, 9] }, { x: [-1, 4], y: [5, 10] }
		], [{ field: 'x', accessor: d => d.x }, { field: 'y', accessor: d => d.y }]],
		expected: { x: [-5, 4], y: [1, 10] }
	},
	{
		args: [[
			{ start: 0, end: 1 }, { start: -10000, end: 0 }
		], [{ field: 'y', accessor: d => [d.start, d.end] }]],
		expected: { y: [-10000, 1] }
	},
	{
		args: [[
			{ start: 0, end: 1 }, { start: -10000, end: 0 }
		], {'y': d => [d.start, d.end]}],
		expected: { y: [-10000, 1] }
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should not modify args ${JSON.stringify(test.expected)}`, () => {
				const argsBeforeCall = test.args;
				calcExtents(...test.args);
				const argsAfterCall = test.args;
				assert.deepStrictEqual(argsBeforeCall, argsAfterCall);
			});
		});
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = calcExtents(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
