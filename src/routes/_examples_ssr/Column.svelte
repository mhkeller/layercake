<script>
	import { LayerCake, Svg, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import Annotations from '../../_components/Annotations.html.svelte';
	import Arrows from '../../_components/Arrows.svelte';
	import ArrowheadMarker from '../../_components/ArrowheadMarker.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	const annotations = [
		{
			text: 'Example text...',
			top: '18%',
			left: '30%',
			arrows: [{
				clockwise: false, // true or false, defaults to true
				source: {
					anchor: 'left-bottom', // can be `{left, middle, right},{top-middle-bottom}`
					dx: -2,
					dy: -7
				},
				target: {
					x: '28%',
					y: '75%'
				}
			},
			{
				source: {
					anchor: 'right-bottom',
					dy: -7,
					dx: 5
				},
				target: {
					x: '68%',
					y: '48%'
				}
			}]
		}
	];

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<style>
	.chart-container {
		width: 100%;
		height: 400px;
		position: relative;
	}
</style>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		position='absolute'
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.028).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		data={data}
	>
		<ScaledSvg>
			<Column/>
		</ScaledSvg>

		<Html>
			<AxisX
				gridlines={false}
			/>
			<AxisY
				ticks={4}
				gridlines={false}
			/>
			<Annotations {annotations}/>
		</Html>
	</LayerCake>

	<!--
		Add a second cake for the arrows that is rendered once the page is loaded
		since the arrows are hard to draw within the viewbox
	-->
	<LayerCake
		position='absolute'
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.028).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		data={data}
	>
		<Svg>
			<svelte:fragment slot="defs">
				<ArrowheadMarker/>
			</svelte:fragment>
			<Arrows {annotations}/>
		</Svg>
	</LayerCake>
</div>
