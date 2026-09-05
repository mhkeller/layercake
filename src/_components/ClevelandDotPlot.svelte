<!--
	@component
	Generates an SVG Cleveland dot plot, also known as a lollipop chart. The y scale must be a band scale.
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

<g class="dot-plot">
	{#each k.data as row}
		{@const yPos = k.yGet(row)}
		{@const xPositions = k.xGet(row)}
		<g class="dot-row">
			<line
				x1={Math.min(...xPositions)}
				y1={yPos + halfBand}
				x2={Math.max(...xPositions)}
				y2={yPos + halfBand}
			></line>

			{#each xPositions as circleX, i}
				<circle cx={circleX} cy={yPos + halfBand} {r} fill={k.cScale?.(k.config.x[i]) ?? '#ccc'}
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
