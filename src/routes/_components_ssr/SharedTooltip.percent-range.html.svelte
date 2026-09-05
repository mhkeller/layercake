<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';

	import MultiLine from '../../_components/MultiLine.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.percent-range.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruit.csv';

	// Name the x field so it can be told apart from the series fields
	const xKey = 'month';
	const yKey = 'value';
	const cKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	const parseDate = timeParse('%Y-%m-%d');

	const dataLong = seriesNames.map(key => {
		return {
			key,
			values: data.map(d => {
				// Only parse the date if it's still a string. This can run again on a
				// rerender. Parsing an already parsed Date returns null.
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
				return {
					key,
					[yKey]: +d[key],
					[xKey]: d[xKey]
				};
			})
		};
	});

	// Flatten the nested series into one list of points. Layer Cake measures
	// the extents from that.
	const flatten = data =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);

	const formatLabelX = timeFormat('%b. %e');
	// const formatLabelY = d => format(`~s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 20, right: 10 }}
		x={xKey}
		y={yKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		flatData={flatten(dataLong)}
		yDomain={[0, null]}
		data={dataLong}
	>
		<ScaledSvg>
			<MultiLine />
		</ScaledSvg>

		<Html>
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
