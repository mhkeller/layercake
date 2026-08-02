<!--
  @component
  Generates an SVG grouped column chart using the `x2` nested scale for the within-group position and the `c` scale for color.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();

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
		c.x2Scale.bandwidth ? c.x2Scale.bandwidth() : Math.abs(c.x2Range[1] - c.x2Range[0])
	);

	let columnHeight = $derived(d => {
		return c.yRange[0] - c.yGet(d);
	});
</script>

<g class="column-group">
	{#each c.data as d, i}
		{@const colHeight = columnHeight(d)}
		{@const xPos = c.xGet(d) + c.x2Get(d)}
		{@const yValue = c.y(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={c.x(d)}
			data-count={yValue}
			x={xPos}
			y={c.yGet(d)}
			width={columnWidth}
			height={colHeight}
			fill={fill || c.cGet(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && yValue}
			<text x={xPos + columnWidth / 2} y={c.yGet(d) - 5} text-anchor="middle">{yValue}</text>
		{/if}
	{/each}
</g>

<style>
	text {
		font-size: 12px;
	}
</style>
