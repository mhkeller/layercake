<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse } from 'd3-time-format';

	import Key from '../../_components/Key.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = [0, 1];
	const cKey = 'key';

	const parseDate = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
		{data}
	>
		<Html>
			<Key shape="square" />
			<div class="padding"></div>
			<Key shape="circle" />
			<div class="padding"></div>
			<Key shape="line" />
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
	.padding {
		margin: 13px 0;
	}
</style>
