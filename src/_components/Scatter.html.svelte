<!--
	@component
	Generates an HTML scatter plot. This component can also work if the x- or y-scale is ordinal, i.e. it has a `.bandwidth` method. See the [timeplot chart](https://layercake.graphics/example/Timeplot) for an example.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {Number} [r] - The circle's radius.
	 * @property {String} [fill] - The circle's fill color.
	 * @property {String} [stroke] - The circle's stroke color.
	 * @property {Number} [strokeWidth] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();
</script>

<div class="scatter-group">
	{#each $data as d}
		<div
			class="circle"
			style="
				left: {$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}%;
				top: {$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}%;
				width: {r * 2}px;
				height: {r * 2}px;
				background-color: {fill};
				border: {strokeWidth}px solid {stroke};
			"
		></div>
	{/each}
</div>

<style>
	.circle {
		position: absolute;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}
</style>
