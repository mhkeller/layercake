<!--
	@component
	Generates an HTML Cleveland dot plot, also known as a lollipop chart. Positions are percentages, so use it with `percentRange={true}`. The y scale must be a band scale.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle radius in pixels.
	 */

	/** @type {Props} */
	let { r = 5 } = $props();

	let halfBand = $derived(k.yScale.bandwidth() / 2);
</script>

<div class="dot-plot">
	{#each k.data as row}
		{@const yPos = k.yGet(row)}
		{@const xPositions = k.xGet(row)}
		<div class="dot-row">
			<div
				class="line"
				style="
					left: {Math.min(...xPositions)}%;
					top: {yPos + halfBand}%;
					right: {100 - Math.max(...xPositions)}%;
				"
			></div>

			{#each xPositions as circleX, i}
				<div
					class="circle"
					style="
						left: {circleX}%;
						top: {yPos + halfBand}%;
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
		transform: translate(-50%, -50%);
	}
</style>
