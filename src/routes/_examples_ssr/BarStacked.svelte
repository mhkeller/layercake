<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import BarStacked from '../../_components/BarStacked.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitOrdinal.csv';

	// Each stacked point is a [start, end] pair, so the x accessor is those two indexes
	const xKey = [0, 1];
	const yKey = 'year';
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const formatLabelX = format('~s');

	// d3's stack turns the wide rows into one series per key, each a list of [start, end] pairs
	const stackedData = stack().keys(seriesNames)(data);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ bottom: 20, left: 35 }}
		x={xKey}
		y={d => d.data[yKey]}
		c={cKey}
		yScale={scaleBand().paddingInner(0.05)}
		cScale={scaleOrdinal()}
		yDomainSort={true}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Html>
			<AxisX showBaseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
		</Html>
		<ScaledSvg>
			<BarStacked />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
