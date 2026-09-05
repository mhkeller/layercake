<script>
	import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';

	import MultiLine from '../../_components/MultiLine.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruit.csv';

	// Name the x field so it can be told apart from the series fields
	const xKey = 'month';
	const yKey = 'value';
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	// Turn the date strings into Date objects, on copies so the imported rows stay as they are
	const parseDate = timeParse('%Y-%m-%d');
	const rows = data.map(d => ({ ...d, [xKey]: parseDate(d[xKey]) }));

	// Reshape the wide rows into one group per series, each with its own list of points
	const dataLong = groupLonger(rows, seriesNames, { groupTo: cKey, valueTo: yKey });

	const formatLabelX = timeFormat('%b. %e');
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20, right: 10 }}
		x={xKey}
		y={yKey}
		c={cKey}
		yDomain={[0, null]}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(dataLong, 'values')}
		data={dataLong}
	>
		<Svg>
			<MultiLine />
		</Svg>

		<Html>
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
