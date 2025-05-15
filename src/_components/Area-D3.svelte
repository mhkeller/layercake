<!--
	@component
	Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getContext } from 'svelte';
	import { area, curveLinear } from 'd3-shape';

	const { data, xGet, yGet, yScale } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {String} [fill] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 * @property {Function} [curve] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610', curve = curveLinear } = $props();

	let path = $derived(
		area()
			.x($xGet)
			.y1($yGet)
			.y0(d => $yScale(0))
			.curve(curve)
	);
	// .defined($y)
</script>

<path class="path-area" d={path($data)} {fill}></path>
