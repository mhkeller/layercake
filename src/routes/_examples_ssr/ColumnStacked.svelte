<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import ColumnStacked from '../../_components/ColumnStacked.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = 'year';
	// Each stacked point is a [start, end] pair, so the y accessor is those two indexes
	const yKey = [0, 1];
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#00e047', '#7ceb68', '#b7f486', '#ecfda5'];

	const formatLabelY = format('~s');

	// d3's stack turns the wide rows into one series per key, each a list of [start, end] pairs
	const stackedData = stack().keys(seriesNames)(data);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ bottom: 20, left: 20 }}
		x={d => d.data[xKey]}
		y={yKey}
		c={cKey}
		xScale={scaleBand().paddingInner(0.02)}
		xDomainSort={false}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Html>
			<AxisX gridlines={false} />
			<AxisY ticks={4} gridlines={false} format={formatLabelY} />
		</Html>
		<ScaledSvg>
			<ColumnStacked />
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
