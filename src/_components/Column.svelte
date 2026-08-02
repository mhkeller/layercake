<!--
  @component
  Generates an SVG column chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00e047'] - The shape's fill color.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each column
	 */

	/** @type {Props} */
	let { fill = '#00e047', stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	let columnWidth = $derived(d => {
		const vals = cake.xGet(d);
		return Math.abs(vals[1] - vals[0]);
	});

	let columnHeight = $derived(d => {
		return cake.yRange[0] - cake.yGet(d);
	});
</script>

<g class="column-group">
	{#each cake.data as d, i}
		{@const colHeight = columnHeight(d)}
		{@const xGot = cake.xGet(d)}
		{@const xPos = Array.isArray(xGot) ? xGot[0] : xGot}
		{@const colWidth = cake.xScale.bandwidth ? cake.xScale.bandwidth() : columnWidth(d)}
		{@const yValue = cake.y(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={cake.x(d)}
			data-count={yValue}
			x={xPos}
			y={cake.yGet(d)}
			width={colWidth}
			height={colHeight}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && yValue}
			<text x={xPos + colWidth / 2} y={cake.height - colHeight - 5} text-anchor="middle"
				>{yValue}</text
			>
		{/if}
	{/each}
</g>

<style>
	text {
		font-size: 12px;
	}
</style>
