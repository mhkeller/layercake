<!--
  @component
  Generates an SVG grouped bar chart using the `y2` nested scale for the within-group position and the `c` scale for color.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill] - The shape's fill color. By default the color is read from the `c` scale.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each bar.
	 */

	/** @type {Props} */
	let { fill = undefined, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	let barHeight = $derived(
		cake.y2Scale.bandwidth ? cake.y2Scale.bandwidth() : Math.abs(cake.y2Range[1] - cake.y2Range[0])
	);

	// Bars start at zero and run out to their value, so negative ones run the
	// other way. Make sure zero is in your xDomain or this lands off the chart.
	let zeroX = $derived(cake.xScale(0));
</script>

<g class="bar-group">
	{#each cake.data as d, i}
		{@const valueX = cake.xGet(d)}
		{@const yPos = cake.yGet(d) + cake.y2Get(d)}
		{@const xValue = cake.x(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={cake.y(d)}
			data-count={xValue}
			x={Math.min(zeroX, valueX)}
			y={yPos}
			width={Math.abs(valueX - zeroX)}
			height={barHeight}
			fill={fill || cake.cGet(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && xValue}
			<!-- Sit the number just past the far end of the bar, on whichever side that is -->
			<text
				x={valueX < zeroX ? valueX - 4 : valueX + 4}
				y={yPos + barHeight / 2}
				dominant-baseline="middle"
				text-anchor={valueX < zeroX ? 'end' : 'start'}>{xValue}</text
			>
		{/if}
	{/each}
</g>

<style>
	text {
		font-size: 12px;
	}
</style>
