<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format } from 'd3-format';

	import MultiLine from '../../_components/MultiLine.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import GroupLabels from '../../_components/GroupLabels.html.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.percent-range.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruit.csv';

	// Name the x field so it can be told apart from the series fields
	const xKey = 'month';
	const yKey = 'value';
	const cKey = 'fruit';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	const parseDate = timeParse('%Y-%m-%d');

	// Create a "long" format that is a grouped series of data points
	// Layer Cake uses this data structure and the key names
	// set in xKey, yKey and cKey to map your data into each scale.
	const dataLong = seriesNames.map(key => {
		return {
			[cKey]: key,
			values: data.map(d => {
				// Only parse the date if it's still a string. This can run again on a
				// rerender. Parsing an already parsed Date returns null.
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
				return {
					[yKey]: +d[key],
					[xKey]: d[xKey],
					[cKey]: key
				};
			})
		};
	});

	const formatLabelX = timeFormat('%b. %e');
	const formatLabelY = d => format(`~s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cRange={seriesColors}
		flatData={flatten(dataLong, 'values')}
		yDomain={[0, null]}
		data={dataLong}
	>
		<Html>
			<AxisX
				gridlines={false}
				ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
				format={formatLabelX}
				snapLabels
				tickMarks
			/>
			<AxisY format={formatLabelY} />
		</Html>

		<ScaledSvg>
			<MultiLine />
		</ScaledSvg>

		<Html>
			<GroupLabels />
			<SharedTooltip formatTitle={formatLabelX} dataset={data} />
		</Html>
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
