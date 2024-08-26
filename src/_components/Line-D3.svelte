<!--
	@component
	Generates an SVG line shape using the `line` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveLinear } from 'd3-shape';

	const { data, xGet, yGet } = getContext('LayerCake');

	/** @type {string} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
	export let stroke = '#ab00d6';

	/** @type {Function} [curve=curveLinear] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses. */
	export let curve = curveLinear;

	$: path = line().x($xGet).y($yGet).curve(curve);
	// .defined($y)
</script>

<path class="path-line" d={path($data)} {stroke}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
