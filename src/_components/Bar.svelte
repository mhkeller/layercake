<!--
	@component
	Generates an SVG bar chart. The y scale must be a band scale.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00bbff'] - The shape's fill color, used for every bar. Set a `c` scale on `<LayerCake>` to color each bar from its own row of data instead.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each bar.
	 */

	/** @type {Props} */
	let { fill, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// Use the `fill` prop if there is one, then the `c` scale's color, then the default
	/** @param {any} d */
	function getFill(d) {
		return fill ?? k.cGet?.(d) ?? '#00bbff';
	}

	// Each bar starts at zero and runs out to its value, so a negative value
	// runs the other way. Keep zero inside your xDomain, or bars will be drawn
	// outside the chart.
	let zeroX = $derived(k.xScale(0));
</script>

<g class="bar-group">
	{#each k.data as d, i}
		{@const valueX = k.xGet(d)}
		{@const yPos = k.yGet(d)}
		{@const barHeight = k.yScale.bandwidth()}
		{@const xValue = k.x(d)}
		<rect
			class="group-rect"
			data-id={i}
			x={Math.min(zeroX, valueX)}
			y={yPos}
			height={barHeight}
			width={Math.abs(valueX - zeroX)}
			fill={getFill(d)}
			{stroke}
			stroke-width={strokeWidth}
		></rect>
		{#if showLabels && xValue != null}
			<!-- Put the number just past the far end of the bar: right of a positive bar and left of a negative one -->
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
