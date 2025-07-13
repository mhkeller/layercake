<!--
	@component
	Generates an SVG scatter plot. This component can also work if the x- or y-scale is ordinal, i.e. it has a `.bandwidth` method. See the [timeplot chart](https://layercake.graphics/example/Timeplot) for an example.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {Number} [r=5] - The circle's radius.
	 * @property {String} [fill='#0cf'] - The circle's fill color.
	 * @property {String} [stroke='#000'] - The circle's stroke color.
	 * @property {Number} [strokeWidth=0] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 0 } = $props();
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}
			cy={$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>
