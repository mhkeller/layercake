<!--
  @component
  Generates an SVG column chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00e047'] - The shape's fill color, used for every column. Set a `c` scale on `<LayerCake>` to color each column from its own row of data instead.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each column
	 */

	/** @type {Props} */
	let { fill, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// The `fill` prop wins, then the `c` scale's color, then the fallback
	let getFill = $derived(/** @param {any} d */ d => fill ?? cake.cGet?.(d) ?? '#00e047');

	let columnWidth = $derived(d => {
		const vals = cake.xGet(d);
		return Math.abs(vals[1] - vals[0]);
	});

	// Columns start at zero and run out to their value, so negative ones hang
	// below it. Make sure zero is in your yDomain or this lands off the chart.
	let zeroY = $derived(cake.yScale(0));
</script>

<g class="column-group">
	{#each cake.data as d, i}
		{@const valueY = cake.yGet(d)}
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
			y={Math.min(zeroY, valueY)}
			width={colWidth}
			height={Math.abs(valueY - zeroY)}
			fill={getFill(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && yValue}
			{@const pointsUp = valueY < zeroY}
			<!--
				Sit the number just clear of the far end of the column, above it going
				up and below it going down. Flipping the baseline instead of nudging by
				a pixel count keeps the gap even at any font size.
			-->
			<text
				x={xPos + colWidth / 2}
				y={valueY}
				dy={pointsUp ? -5 : 5}
				text-anchor="middle"
				dominant-baseline={pointsUp ? 'auto' : 'hanging'}>{yValue}</text
			>
		{/if}
	{/each}
</g>

<style>
	text {
		font-size: 12px;
	}
</style>
