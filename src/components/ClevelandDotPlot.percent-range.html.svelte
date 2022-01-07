<!--
	@component
	Generates an HTML Cleveland dot plot, also known as a lollipop-chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zScale, yScale, config } = getContext('LayerCake');

	/** @type {Number} [r=5] – The circle radius. */
	export let r = 5;

	$: midHeight = $yScale.bandwidth() / 2;
</script>

<div class="dot-plot">
	{#each $data as row}
		<div class="dot-row">
			<div
				class="line"
				style="
					left: {Math.min(...$xGet(row))}%;
					top: {$yGet(row) + midHeight}%;
					right: {100 - Math.max(...$xGet(row))}%;
				"
			></div>

			{#each $xGet(row) as circleX, i}
				<div
					class="circle"
					style="
						left: {circleX}%;
						top: {$yGet(row) + midHeight}%;
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
