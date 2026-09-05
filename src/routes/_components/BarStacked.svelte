<script>
	import { LayerCake, Svg, flatten } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	import BarStacked from '../../_components/BarStacked.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = [0, 1];
	const yKey = 'year';
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const stackData = stack().keys(seriesNames);

	const series = stackData(data);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={d => d.data[yKey]}
		c={cKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={[2016, 2017, 2018, 2019]}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(series)}
		data={series}
	>
		<Svg>
			<BarStacked />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
