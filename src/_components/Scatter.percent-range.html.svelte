<!--
	@component
	Generates an HTML scatter plot for `percentRange={true}` charts, which also makes it work in server-side rendered charts. If the x or y scale is a band scale, each circle sits in the middle of its band.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();
</script>

<div class="scatter-group">
	{#each k.data as d}
		<div
			class="circle"
			style="
				left: {k.xGet(d) + (k.xScale.bandwidth ? k.xScale.bandwidth() / 2 : 0)}%;
				top: {k.yGet(d) + (k.yScale.bandwidth ? k.yScale.bandwidth() / 2 : 0)}%;
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
