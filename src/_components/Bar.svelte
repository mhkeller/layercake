<!--
	@component
	Generates an SVG bar chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#00bbff'] - The shape's fill color, used for every bar. Set a `c` scale on `<LayerCake>` to color each bar from its own row of data instead.
	 */

	/** @type {Props} */
	let { fill } = $props();

	// The `fill` prop wins, then the `c` scale's color, then the fallback
	let getFill = $derived(/** @param {any} d */ d => fill ?? k.cGet?.(d) ?? '#00bbff');

	// Bars start at zero and run out to their value, so negative ones run the
	// other way. Make sure zero is in your xDomain or this lands off the chart.
	let zeroX = $derived(k.xScale(0));
</script>

<g class="bar-group">
	{#each k.data as d, i}
		{@const valueX = k.xGet(d)}
		<rect
			class="group-rect"
			data-id={i}
			x={Math.min(zeroX, valueX)}
			y={k.yGet(d)}
			height={k.yScale.bandwidth()}
			width={Math.abs(valueX - zeroX)}
			fill={getFill(d)}
		></rect>
	{/each}
</g>
