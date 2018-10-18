/* globals describe it */
import calcExtents from '../src/lib/calcExtents.js';
import * as assert from 'assert';

const name = 'calcExtents';

const tests = [
	{ args: [[]], expected: null },
	{ args: [{}], expected: null },
	{
		args: [[
			{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}
		], [{field: 'x', accessor: d => d.x}]],
		expected: {x: [0, 4]}
	},
	{
		args: [[
			{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}
		], [{field: 'x', accessor: d => d.x}, {field: 'y', accessor: d => d.y}]],
		expected: {x: [0, 4], y: [1, 5]}
	},
	{
		args: [[
			{x: [-5, 0], y: [1, 6]}, {x: [-4, 1], y: [2, 7]}, {x: [-3, 2], y: [3, 8]}, {x: [-2, 3], y: [4, 9]}, {x: [-1, 4], y: [5, 10]}
		], [{field: 'x', accessor: d => d.x}, {field: 'y', accessor: d => d.y}]],
		expected: {x: [-5, 4], y: [1, 10]}
	}
];

describe(name, function () {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), function () {
			it(`should equal ${JSON.stringify(test.expected)}`, function () {
				const actual = calcExtents(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
