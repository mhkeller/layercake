<script>
	import { LayerCake, Svg, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import Annotations from '../../_components/AnnotationsData.html.svelte';
	import Arrows from '../../_components/Arrows.svelte';
	import ArrowheadMarker from '../../_components/ArrowheadMarker.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	const annotations = [
		{
			text: 'Example text...',
			[xKey]: 1980,
			[yKey]: 14,
			dx: 15, // Nudge the text, in pixels
			dy: -5,
			arrows: [
				{
					clockwise: false, // Which way the arrow bows, true by default
					source: {
						anchor: 'left-bottom', // A spot on the text box: left, middle or right, then top, middle or bottom
						dx: -2,
						dy: -7
					},
					target: {
						// A target under the data keys goes through the x and y scales
						[xKey]: 1980,
						[yKey]: 4.5,
						// Nudge the arrow tip, in pixels
						dx: 2,
						dy: 5
					}
				},
				{
					source: {
						anchor: 'right-bottom',
						dy: -7,
						dx: 5
					},
					target: {
						// Percentage strings are measured against the chart instead
						x: '68%',
						y: '48%'
					}
				}
			]
		}
	];
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		position="absolute"
		padding={{ bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02)}
		xDomain={[1979, 1980, 1981, 1982, 1983]}
		yDomain={[0, null]}
		{data}
	>
		<Html>
			<AxisX gridlines={false} />
			<AxisY snapBaselineLabel />
		</Html>
		<ScaledSvg>
			<Column />
		</ScaledSvg>

		<Html>
			<Annotations {annotations} />
		</Html>
	</LayerCake>

	<!--
		A second LayerCake, rendered only in the browser, holds the arrows. The
		ScaledSvg above stretches to fit its box, which would bend the arrows out
		of shape, so they get a plain Svg with the same scales.
	-->
	<LayerCake
		position="absolute"
		padding={{ bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomain={[1979, 1980, 1981, 1982, 1983]}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			{#snippet defs()}
				<ArrowheadMarker />
			{/snippet}
			<Arrows {annotations} />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		position: relative;
		width: 100%;
		height: 250px;
	}
</style>
