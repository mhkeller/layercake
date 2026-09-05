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
	let { fill, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// Use the `fill` prop if there is one, then the `c` scale's color, then the default
	/** @param {any} d */
	function getFill(d) {
		return fill ?? k.cGet?.(d) ?? '#00bbff';
	}

	// This chart needs the y2 scale. A chart might not set one, so fall back
	// to a zero-height bar instead of crashing.
	let barHeight = $derived.by(() => {
		const scale = k.y2Scale;
		if (scale?.bandwidth) return scale.bandwidth();
		const range = k.y2Range ?? [0, 0];
		return Math.abs(range[1] - range[0]);
	});

	// Each bar starts at zero and runs out to its value, so a negative value
	// runs the other way. Keep zero inside your xDomain, or bars will be drawn
	// outside the chart.
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
			fill={getFill(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
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
