<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	import ClevelandDotPlot from '../../_components/ClevelandDotPlot.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitOrdinal.csv';

	const yKey = 'year';
	// Every column but the year is a dot, so the x accessor is the list of those columns
	const xKey = Object.keys(data[0]).filter(d => d !== yKey);

	const seriesColors = ['#ff00cc', '#00bbff', '#00e047', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomainSort={true}
		xDomain={[0, null]}
		xPadding={[10, 0]}
		cScale={scaleOrdinal()}
		cDomain={xKey}
		cRange={seriesColors}
		{data}
	>
		<Svg>
			<AxisX />
			<AxisY gridlines={false} />
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
