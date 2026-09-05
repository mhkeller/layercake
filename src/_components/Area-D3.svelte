<!--
	@component
	Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { area, curveLinear } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#ab00d610'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 * @property {import('d3-shape').CurveFactory} [curve] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610', curve = curveLinear } = $props();

	let path = $derived(
		area()
			.x(k.xGet)
			.y1(k.yGet)
			.y0(d => k.yScale(0))
			.curve(curve)
	);
	// .defined($y)
</script>

<path class="path-area" d={path(k.data)} {fill}></path>
