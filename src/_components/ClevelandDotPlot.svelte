<!--
	@component
	Generates an SVG Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, yScale, zScale, config } = getContext('LayerCake');

	/** @type {Number} [r=5] – The circle radius. */
	export let r = 5;

	$: midHeight = $yScale.bandwidth() / 2;
</script>

<g class="dot-plot">
	{#each $data as row}
		{@const yVal = $yGet(row)}
		{@const xVals = $xGet(row)}
		<g class="dot-row">
			<line
				x1="{Math.min(...xVals)}"
				y1="{yVal + midHeight}"
				x2="{Math.max(...xVals)}"
				y2="{yVal + midHeight}"
			></line>

			{#each xVals as circleX, i}
				<circle
					cx="{circleX}"
					cy="{yVal + midHeight}"
					r="{r}"
					fill="{$zScale($config.x[i])}"
				></circle>
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
