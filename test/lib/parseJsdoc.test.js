/* globals describe it */
import * as assert from 'assert';
import fn from '../../src/lib/helpers/parseJsdoc.js';

const name = 'parseJsdoc';

const tests = [
	{
		input: `@type {string} [stroke='#ccc'] - The shape's stroke color.`,
		expected: {
			kind: 'type',
			type: 'String',
			name: 'stroke',
			required: false,
			defaultValue: "'#ccc'",
			description: `The shape's stroke color.`
		}
	},
	{
		input: `@property {number} min - The brush's min value. Useful to bind to.`,
		expected: {
			kind: 'property',
			type: 'Number',
			name: 'min',
			required: true,
			defaultValue: null,
			description: `The brush's min value. Useful to bind to.`
		}
	},
	{
		input: `@type {(d: any) => string} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return.`,
		expected: {
			kind: 'type',
			type: `(d: any) => string`,
			name: 'format',
			required: false,
			defaultValue: `d => d`,
			description: `A function that passes the current tick value and expects a nicely formatted value in return.`
		}
	},
	{
		input: `@type {number|Array<any>|Function|undefined} [ticks] - If this is a number, it passes that along to D3.`,
		expected: {
			kind: 'type',
			type: `number|Array<any>|Function|undefined`,
			name: 'ticks',
			required: false,
			defaultValue: null,
			description: `If this is a number, it passes that along to D3.`
		}
	},
	{
		input: `@type {Function} [sortBy=(a, b) => b.value - a.value] - The order in which circle's are drawn. Sorting on the \`depth\` key is also a popular choice.`,
		expected: {
			kind: 'type',
			type: 'Function',
			name: 'sortBy',
			required: false,
			defaultValue: `(a, b) => b.value - a.value`,
			description: `The order in which circle's are drawn. Sorting on the \`depth\` key is also a popular choice.`
		}
	}
];

describe(name, () => {
	tests.forEach(test => {
		describe(`${name}("${test.input}")`, () => {
			const actual = fn(test.input);
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});
