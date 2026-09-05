<!--
  @component
  Generates an SVG grouped column chart using the `x2` nested scale for the within-group position and the `c` scale for color.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill] - The shape's fill color. By default the color is read from the `c` scale.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each column.
	 */

	/** @type {Props} */
	let { fill = undefined, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// x2 drives this chart but is optional in the types – fall back to a
	// zero-width column rather than crashing when it's missing
	let columnWidth = $derived.by(() => {
		const scale = k.x2Scale;
		if (scale?.bandwidth) return scale.bandwidth();
		const range = k.x2Range ?? [0, 0];
		return Math.abs(range[1] - range[0]);
	});

	// Columns start at zero and run out to their value, so negative ones hang
	// below it. Make sure zero is in your yDomain or this lands off the chart.
	let zeroY = $derived(k.yScale(0));
</script>

<g class="column-group">
	{#each k.data as d, i}
		{@const valueY = k.yGet(d)}
		{@const xPos = k.xGet(d) + (k.x2Get?.(d) ?? 0)}
		{@const yValue = k.y(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={k.x(d)}
			data-count={yValue}
			x={xPos}
			y={Math.min(zeroY, valueY)}
			width={columnWidth}
			height={Math.abs(valueY - zeroY)}
			fill={fill ?? k.cGet?.(d) ?? '#00bbff'}
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
