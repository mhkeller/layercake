<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import AnnotationsData from '../../components/AnnotationsData.html.svelte';
	import Column from '../../components./../components/Column.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	const annotations = [
		{
			text: 'Data-driven annotation',
			year: '1979',
			value: 15
		},
		{
			text: '...and another one',
			year: '1980',
			value: 12
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner([0.02]).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		data={data}
	>
		<Svg>
			<Column/>
		</Svg>

		<Html>
			<AnnotationsData {annotations}/>
		</Html>
	</LayerCake>
</div>
