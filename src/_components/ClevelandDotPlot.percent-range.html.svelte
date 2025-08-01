<!--
	@component
	Generates an HTML Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zScale, yScale, config } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle radius.
	 */

	/** @type {Props} */
	let { r = 5 } = $props();

	let midHeight = $derived($yScale.bandwidth() / 2);
</script>

<div class="dot-plot">
	{#each $data as row}
		{@const scaledYValue = $yGet(row)}
		{@const scaledXValues = $xGet(row)}
		<div class="dot-row">
			<div
				class="line"
				style="
					left: {Math.min(...scaledXValues)}%;
					top: {scaledYValue + midHeight}%;
					right: {100 - Math.max(...scaledXValues)}%;
				"
			></div>

			{#each scaledXValues as circleX, i}
				<div
					class="circle"
					style="
						left: {circleX}%;
						top: {scaledYValue + midHeight}%;
						width: {r * 2}px;
						height: {r * 2}px;
						background: {$zScale($config.x[i])};
					"
				></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.line {
		position: absolute;
		border-bottom: 1px solid #000;
	}
	.circle {
		position: absolute;
		border-radius: 50%;
		border: 1px solid #000;
		stroke: #000;
		transform: translate(-50%, -50%);
	}
</style>
