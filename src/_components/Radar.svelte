<!--
	@component
	Generates an SVG radar chart. Each row becomes one polygon. The x accessor must be a list of keys, one per axis, and the x scale maps each value to a radius.
 -->
<script>
	import { line, curveCardinalClosed } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#f0c'] - The polygon's fill color.
	 * @property {string} [stroke='#f0c'] - The polygon's stroke color.
	 * @property {number} [strokeWidth=2] - The polygon's stroke width in pixels.
	 * @property {number} [fillOpacity=0.5] - The polygon's fill opacity.
	 * @property {number} [r=4.5] - Each circle's radius in pixels.
	 * @property {string} [circleFill='#f0c'] - Each circle's fill color.
	 * @property {string} [circleStroke='#fff'] - Each circle's stroke color.
	 * @property {number} [circleStrokeWidth=1] - Each circle's stroke width in pixels.
	 */

	/** @type {Props} */
	let {
		fill = '#f0c',
		stroke = '#f0c',
		strokeWidth = 2,
		fillOpacity = 0.5,
		r = 4.5,
		circleFill = '#f0c',
		circleStroke = '#fff',
		circleStrokeWidth = 1
	} = $props();

	let angleSlice = $derived((Math.PI * 2) / k.config.x.length);

	// Each value is a radius. Axis i sits at angle i around the circle, starting from the top.
	let path = $derived(
		line(
			(/** @type {number} */ d, i) => d * Math.cos(angleSlice * i - Math.PI / 2),
			(/** @type {number} */ d, i) => d * Math.sin(angleSlice * i - Math.PI / 2)
		).curve(curveCardinalClosed)
	);
</script>

<g transform="translate({k.width / 2}, {k.height / 2})">
	{#each k.data as row}
		{@const xVals = k.xGet(row)}
		<!-- Draw a line connecting all the dots -->
		<path
			class="path-line"
			d={path(xVals)}
			{stroke}
			stroke-width={strokeWidth}
			{fill}
			fill-opacity={fillOpacity}
		></path>

		<!-- One dot per value -->
		{#each xVals as circleR, i}
			{@const thisAngleSlice = angleSlice * i - Math.PI / 2}
			<circle
				cx={circleR * Math.cos(thisAngleSlice)}
				cy={circleR * Math.sin(thisAngleSlice)}
				{r}
				fill={circleFill}
				stroke={circleStroke}
				stroke-width={circleStrokeWidth}
			></circle>
		{/each}
	{/each}
</g>

<style>
	.path-line {
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
