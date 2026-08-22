<!--
	@component
	Generates an SVG Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle radius.
	 */

	/** @type {Props} */
	let { r = 5 } = $props();

	let midHeight = $derived(k.yScale.bandwidth() / 2);
</script>

<g class="dot-plot">
	{#each k.data as row}
		{@const yVal = k.yGet(row)}
		{@const xVals = k.xGet(row)}
		<g class="dot-row">
			<line
				x1={Math.min(...xVals)}
				y1={yVal + midHeight}
				x2={Math.max(...xVals)}
				y2={yVal + midHeight}
			></line>

			{#each xVals as circleX, i}
				<circle cx={circleX} cy={yVal + midHeight} {r} fill={k.cScale(k.config.x[i])}></circle>
			{/each}
		</g>
	{/each}
</g>

<style>
	line {
		stroke-width: 1px;
		stroke: #000;
	}
	circle {
		stroke: #000;
		stroke-width: 1px;
	}
</style>
