<!--
	@component
	Generates an SVG multi-series line chart. It expects your data to be an array of objects, each with a `values` key that is an array of data objects.
 -->
<script>
	import { line, curveLinear } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/** @typedef {import('d3-shape').CurveFactory} CurveFactory */
	/**
	 * @typedef {Object} Props
	 * @property {CurveFactory} [curve=curveLinear] - A D3 curve factory such as `curveCardinal`, passed uncalled. See [d3-shape](https://github.com/d3/d3-shape#curves) for the options.
	 */

	/** @type {Props} */
	let { curve = curveLinear } = $props();

	let path = $derived(line().x(k.xGet).y(k.yGet).curve(curve));
</script>

<g class="line-group">
	{#each k.data as group}
		<path class="path-line" d={path(group.values)} stroke={k.cGet?.(group) ?? '#ccc'}></path>
	{/each}
</g>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3px;
	}
</style>
