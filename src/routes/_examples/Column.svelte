<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
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
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		data={data}
	>
		<Svg>
			<Column/>
			<AxisX
				gridlines={false}
			/>
			<AxisY
				gridlines={false}
			/>
		</Svg>

		<Html>
			<Annotations {annotations}/>
		</Html>

		<Svg>
			<svelte:fragment slot="defs">
				<ArrowheadMarker/>
			</svelte:fragment>
			<Arrows {annotations}/>
		</Svg>
	</LayerCake>
</div>
