/* globals describe, test, expect */
import { render } from '@testing-library/svelte';
import { get } from 'svelte/store';
import LayerCake from '../../src/lib/LayerCake.svelte';

const defaultProps = {
	width: 500,
	height: 300,
	data: [
		{ myX: 0, myY: 1 },
		{ myX: 2, myY: 4 },
		{ myX: 3, myY: 10 },
		{ myX: 5, myY: 15 }
	],
	x: 'myX',
	y: 'myY'
};

describe('MyComponent', () => {
	test('displays the correct value TK', () => {
		const { component } = render(LayerCake, defaultProps);
		// Test computed slot prop
		console.log(get(component.$$.context.get('LayerCake').xDomain));
		// expect(10).toBe(10);
		// expect(component.get('propA')).toBe(10);
	});

})
