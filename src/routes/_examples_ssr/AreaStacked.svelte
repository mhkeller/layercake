<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';
	import { timeParse, timeFormat } from 'd3-time-format';

	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import AreaStacked from '../../_components/AreaStacked.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = [0, 1];
	const zKey = 'key';

	const parseDate = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
	});

	/* --------------------------------------------
	 * Create a stacked data structure
	 */
	const stackData = stack().keys(seriesNames);

	const series = stackData(data);

	const formatLabelX = timeFormat('%b. %-d');
	const formatLabelY = d => format(`~s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 0, right: 0, bottom: 20, left: 17 }}
		x={d => d.data[xKey]}
		y={yKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(series)}
		data={series}
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
