<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	import ClevelandDotPlot from '../../_components/ClevelandDotPlot.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitOrdinal.csv';

	const yKey = 'year';
	const xKey = Object.keys(data[0]).filter(d => d !== yKey);

	const seriesColors = ['#ff00cc', '#00bbff', '#00e047', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ left: 10, right: 10 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={[2016, 2017, 2018, 2019]}
		cScale={scaleOrdinal()}
		cDomain={xKey}
		cRange={seriesColors}
		{data}
	>
		<Svg>
			<ClevelandDotPlot />
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
