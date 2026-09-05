<script>
	import { LayerCake, Svg, calcExtents } from 'layercake';
	import { utcDay } from 'd3-time';
	import { scaleBand, scaleTime } from 'd3-scale';

	import ScatterSvg from '../../_components/Scatter.svg.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/days.csv';

	const xKey = 'seconds';
	const yKey = 'day';

	const r = 4;

	// Split each timestring into its day and its seconds since midnight
	const rows = data.map(d => {
		const [day, time] = String(d.timestring).split('T');
		const [hours, minutes, seconds] = time.replace('Z', '').split(':').map(Number);
		return { ...d, [yKey]: day, [xKey]: hours * 60 * 60 + minutes * 60 + seconds };
	});

	// Every day from the first to the last, so days with no rows still get a row on the chart
	const [firstDay, lastDay] = calcExtents(rows, { day: d => d[yKey] }).day;
	const allDays = utcDay
		.range(new Date(firstDay), utcDay.offset(new Date(lastDay), 1))
		.map(d => d.toISOString().split('T')[0]);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 15, bottom: 20, left: 75 }}
		x={xKey}
		y={yKey}
		xDomain={[0, 24 * 60 * 60]}
		yDomain={allDays}
		xScale={scaleTime()}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		data={rows}
	>
		<Svg>
			<AxisX
				ticks={[0, 4, 8, 12, 16, 20, 24].map(d => d * 60 * 60)}
				format={d => `${Math.floor(d / 60 / 60)}:00`}
			/>
			<AxisY />
			<ScatterSvg {r} fill="rgba(255, 204, 0, 0.75)" />
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
