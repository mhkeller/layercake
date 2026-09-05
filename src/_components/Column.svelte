<!--
	@component
	Generates an SVG column chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00e047'] - The shape's fill color, used for every column. Set a `c` scale on `<LayerCake>` to color each column from its own row of data instead.
	 * @property {string} [stroke='#000'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0] - The shape's stroke width.
	 * @property {boolean} [showLabels=false] - Show the numbers for each column.
	 */

	/** @type {Props} */
	let { fill, stroke = '#000', strokeWidth = 0, showLabels = false } = $props();

	// Use the `fill` prop if there is one, then the `c` scale's color, then the default
	/** @param {any} d */
	function getFill(d) {
		return fill ?? k.cGet?.(d) ?? '#00e047';
	}

	// A histogram passes a [start, end] pair through the x accessor, so the column spans the two
	/** @param {any} d */
	function columnWidth(d) {
		const vals = k.xGet(d);
		return Math.abs(vals[1] - vals[0]);
	}

	// Each column starts at zero and runs out to its value, so a negative value
	// hangs below zero. Keep zero inside your yDomain, or columns will be drawn
	// outside the chart.
	let zeroY = $derived(k.yScale(0));
</script>

<g class="column-group">
	{#each k.data as d, i}
		{@const valueY = k.yGet(d)}
		{@const xGot = k.xGet(d)}
		{@const xPos = Array.isArray(xGot) ? xGot[0] : xGot}
		{@const colWidth = k.xScale.bandwidth ? k.xScale.bandwidth() : columnWidth(d)}
		{@const yValue = k.y(d)}
		<rect
			class="group-rect"
			data-id={i}
			data-range={k.x(d)}
			data-count={yValue}
			x={xPos}
			y={Math.min(zeroY, valueY)}
			width={colWidth}
			height={Math.abs(valueY - zeroY)}
			fill={getFill(d)}
			{stroke}
			stroke-width={strokeWidth}
		/>
		{#if showLabels && yValue != null}
			{@const pointsUp = valueY < zeroY}
			<!--
				Put the number just past the far end of the column: above a positive
				column and below a negative one. Switching the text baseline keeps the
				gap the same at any font size.
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
