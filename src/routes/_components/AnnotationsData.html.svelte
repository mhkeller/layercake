<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import AnnotationsData from '../../_components/AnnotationsData.html.svelte';
	import Column from '../../_components/Column.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	const annotations = [
		{
			text: 'Data-driven annotation',
			year: 1979,
			value: 15
		},
		{
			text: '...and another one',
			year: 1980,
			value: 12
		}
	];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, left: 20 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomain={[1979, 1980, 1981, 1982, 1983]}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<Column />
		</Svg>

		<Html>
			<AnnotationsData {annotations} />
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
