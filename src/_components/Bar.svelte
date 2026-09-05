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

	// Use the `fill` prop if there is one, then the `c` scale's color, then the default
	let getFill = $derived(/** @param {any} d */ d => fill ?? k.cGet?.(d) ?? '#00bbff');

	// Each bar starts at zero and runs out to its value, so a negative value
	// runs the other way. Keep zero inside your xDomain, or bars will be drawn
	// outside the chart.
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
