<script>
	import { LayerCake, Svg, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import Annotations from '../../_components/AnnotationsData.html.svelte';
	import Arrows from '../../_components/Arrows.svelte';
	import ArrowheadMarker from '../../_components/ArrowheadMarker.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	const annotations = [
		{
			text: 'Example text...',
			[xKey]: '1980',
			[yKey]: 14,
			dx: 15, // Optional pixel values
			dy: -5,
			arrows: [
				{
					clockwise: false, // true or false, defaults to true
					source: {
						anchor: 'left-bottom', // can be `{left, middle, right},{top-middle-bottom}`
						dx: -2,
						dy: -7
					},
					target: {
						// These can be expressed in our data units if passed under the data keys
						[xKey]: '1980',
						[yKey]: 4.5,
						// Optional adjustments
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
						// Or if they are percentage strings they can be passed directly
						x: '68%',
						y: '48%'
					}
				}
			]
		}
	];

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		position="absolute"
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.028).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		{data}
	>
		<ScaledSvg>
			<Column />
		</ScaledSvg>

		<Html>
			<AxisX gridlines={false} />
			<AxisY gridlines={false} snapBaselineLabel />
			<Annotations {annotations} />
		</Html>
	</LayerCake>

	<!--
		Add a second cake for the arrows that is rendered once the page is loaded
		since the arrows are hard to draw within the viewbox
	-->
	<LayerCake
		position="absolute"
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.028).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<svelte:fragment slot="defs">
				<ArrowheadMarker />
			</svelte:fragment>
			<Arrows {annotations} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 400px;
		position: relative;
	}
</style>
