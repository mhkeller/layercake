<script>
	import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';

	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format } from 'd3-format';

	import MultiLine from '../../_components/MultiLine.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import GroupLabels from '../../_components/GroupLabels.html.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruit.csv';

	// Name the x field so it can be told apart from the series fields
	const xKey = 'month';
	const yKey = 'value';
	const cKey = 'fruit';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	// Turn the date strings into Date objects, on copies so the imported rows stay as they are
	const parseDate = timeParse('%Y-%m-%d');
	const rows = data.map(d => ({ ...d, [xKey]: parseDate(d[xKey]) }));

	const formatLabelX = timeFormat('%b. %e');
	const formatLabelY = format('~s');

	// One tick per month in the data, oldest first so the snapped labels sit at the right ends
	const xTicks = rows.map(d => d[xKey]).sort((a, b) => a - b);

	// Reshape the wide rows into one group per series, each with its own list of points
	const groupedData = groupLonger(rows, seriesNames, {
		groupTo: cKey,
		valueTo: yKey
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		c={cKey}
		yDomain={[0, null]}
		cScale={scaleOrdinal()}
		cRange={seriesColors}
		flatData={flatten(groupedData, 'values')}
		data={groupedData}
	>
		<Svg>
			<AxisX gridlines={false} ticks={xTicks} format={formatLabelX} snapLabels tickMarks />
			<AxisY ticks={4} format={formatLabelY} />
			<MultiLine />
		</Svg>

		<Html>
			<GroupLabels />
			<SharedTooltip formatTitle={formatLabelX} dataset={rows} />
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
