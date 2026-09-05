<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';

	import { scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';
	import { timeParse, timeFormat } from 'd3-time-format';

	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import AreaStacked from '../../_components/AreaStacked.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	// Each stacked point is a [start, end] pair, so the y accessor is those two indexes
	const yKey = [0, 1];
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	// Turn the date strings into Date objects, on copies so the imported rows stay as they are
	const parseDate = timeParse('%Y-%m-%d');
	const rows = data.map(d => ({ ...d, [xKey]: parseDate(d[xKey]) }));

	const formatLabelX = timeFormat('%b. %-d');
	const formatLabelY = format('~s');

	// d3's stack turns the wide rows into one series per key, each a list of [start, end] pairs
	const stackedData = stack().keys(seriesNames)(rows);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ bottom: 20, left: 17 }}
		x={d => d.data[xKey]}
		y={yKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Html>
			<AxisX format={formatLabelX} tickMarks />
			<AxisY format={formatLabelY} />
		</Html>
		<ScaledSvg>
			<AreaStacked />
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
