<!--
	@component
	Generates an HTML Cleveland dot plot, also known as a lollipop-chart.
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

<div class="dot-plot">
	{#each k.data as row}
		{@const scaledYValue = k.yGet(row)}
		{@const scaledXValues = k.xGet(row)}
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
						background: {k.cScale?.(k.config.x[i]) ?? '#ccc'};
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
