<!--
  @component
  Generates an SVG grouped bar chart using the `y2` nested scale for the within-group position and the `c` scale for color.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill] - The shape's fill color. By default the color is read from the `c` scale.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each bar.
	 */

	/** @type {Props} */
	let { fill = undefined, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// y2 drives this chart but is optional in the types – fall back to a
	// zero-height bar rather than crashing when it's missing
	let barHeight = $derived.by(() => {
		const scale = k.y2Scale;
		if (scale?.bandwidth) return scale.bandwidth();
		const range = k.y2Range ?? [0, 0];
		return Math.abs(range[1] - range[0]);
	});

	// Bars start at zero and run out to their value, so negative ones run the
	// other way. Make sure zero is in your xDomain or this lands off the chart.
	let zeroX = $derived(k.xScale(0));
</script>

<g class="bar-group">
	{#each k.data as d, i}
		{@const valueX = k.xGet(d)}
		{@const yPos = k.yGet(d) + (k.y2Get?.(d) ?? 0)}
		{@const xValue = k.x(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={k.y(d)}
			data-count={xValue}
			x={Math.min(zeroX, valueX)}
			y={yPos}
			width={Math.abs(valueX - zeroX)}
			height={barHeight}
			fill={fill ?? k.cGet?.(d) ?? '#00bbff'}
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
