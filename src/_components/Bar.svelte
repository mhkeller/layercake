<!--
	@component
	Generates an SVG bar chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00bbff'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 */

	/** @type {Props} */
	let { fill = '#00bbff' } = $props();
</script>

<g class="bar-group">
	{#each cake.data as d, i}
		<rect
			class="group-rect"
			data-id={i}
			x={cake.xScale.range()[0]}
			y={cake.yGet(d)}
			height={cake.yScale.bandwidth()}
			width={cake.xGet(d)}
			{fill}
		></rect>
	{/each}
</g>
