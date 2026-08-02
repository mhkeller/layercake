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

	let barStart = $derived(cake.xRange[0]);

	let barHeight = $derived(
		cake.y2Scale.bandwidth ? cake.y2Scale.bandwidth() : Math.abs(cake.y2Range[1] - cake.y2Range[0])
	);

	let barWidth = $derived(d => {
		return cake.xGet(d) - barStart;
	});
</script>

<g class="bar-group">
	{#each cake.data as d, i}
		{@const barLength = barWidth(d)}
		{@const yPos = cake.yGet(d) + cake.y2Get(d)}
		{@const xValue = cake.x(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={cake.y(d)}
			data-count={xValue}
			x={barStart}
			y={yPos}
			width={barLength}
			height={barHeight}
			fill={fill || cake.cGet(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && xValue}
			<text x={barStart + barLength + 4} y={yPos + barHeight / 2} dominant-baseline="middle"
				>{xValue}</text
			>
		{/if}
	{/each}
</g>

<style>
	text {
		font-size: 12px;
	}
</style>
