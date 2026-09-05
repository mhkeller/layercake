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
	 * @property {string} [fill='#ab00d610'] - The shape's fill color.
	 * @property {import('d3-shape').CurveFactory} [curve=curveLinear] - A D3 curve factory such as `curveCardinal`, passed uncalled. See [d3-shape](https://github.com/d3/d3-shape#curves) for the options.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610', curve = curveLinear } = $props();

	let path = $derived(
		area()
			.x(k.xGet)
			.y1(k.yGet)
			.y0(() => k.yScale(0))
			.curve(curve)
	);
</script>

<path class="path-area" d={path(k.data)} {fill}></path>
