<!--
	@component
	Generates an SVG line shape using the `line` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { line, curveLinear } from 'd3-shape';

	const k = getLayerCakeContext();

	/** @typedef {import('d3-shape').CurveFactory} CurveFactory */
	/**
	 * @typedef {Object} Props
	 * @property {string} [stroke='#ab00d6'] - The line's stroke color.
	 * @property {CurveFactory} [curve=curveLinear] - A D3 curve factory such as `curveCardinal`, passed uncalled. See [d3-shape](https://github.com/d3/d3-shape#curves) for the options.
	 */

	/** @type {Props} */
	let { stroke = '#ab00d6', curve = curveLinear } = $props();

	let path = $derived(line().x(k.xGet).y(k.yGet).curve(curve));
</script>

<path class="path-line" d={path(k.data)} {stroke}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2px;
	}
</style>
