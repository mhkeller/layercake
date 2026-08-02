<!--
  @component
  Generates an SVG grouped column chart using the `x2` nested scale for the within-group position and the `c` scale for color.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill] - The shape's fill color. By default the color is read from the `c` scale.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each column.
	 */

	/** @type {Props} */
	let { fill = undefined, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	let columnWidth = $derived(
		cake.x2Scale.bandwidth ? cake.x2Scale.bandwidth() : Math.abs(cake.x2Range[1] - cake.x2Range[0])
	);

	// Columns start at zero and run out to their value, so negative ones hang
	// below it. Make sure zero is in your yDomain or this lands off the chart.
	let zeroY = $derived(cake.yScale(0));
</script>

<g class="column-group">
	{#each cake.data as d, i}
		{@const valueY = cake.yGet(d)}
		{@const xPos = cake.xGet(d) + cake.x2Get(d)}
		{@const yValue = cake.y(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={cake.x(d)}
			data-count={yValue}
			x={xPos}
			y={Math.min(zeroY, valueY)}
			width={columnWidth}
			height={Math.abs(valueY - zeroY)}
			fill={fill || cake.cGet(d)}
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
				x={xPos + columnWidth / 2}
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
