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
	 * @property {CurveFactory} [curve] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses.
	 */

	/** @type {Props} */
	let { curve = curveLinear } = $props();

	let path = $derived(line().x(k.xGet).y(k.yGet).curve(curve));
	// .defined($y)
</script>

<g class="line-group">
	{#each k.data as group}
		<path class="path-line" d={path(group.values)} stroke={k.cGet(group)}></path>
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
