<script>
	import { LayerCake, Html, calcExtents } from 'layercake';
	import { timeDay } from 'd3-time';
	import { scaleBand, scaleTime } from 'd3-scale';

	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import Scatter from '../../_components/Scatter.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/days.csv';

	const xKey = 'seconds';
	const yKey = 'day';

	const r = 4;
	const padding = 2;

	const daysTransformed = data.map(d => {
		const parts = d.timestring.split('T');
		const time = parts[1]
			.replace('Z', '')
			.split(':')
			.map(q => +q);
		d[xKey] = time[0] * 60 * 60 + time[1] * 60 + time[2];
		d[yKey] = parts[0];
		return d;
	});

	/* --------------------------------------------
	 * Generate a range of days in between the min and max
	 * in case we are missing any in our data so we can show empty days for them
	 */
	const extents = calcExtents(daysTransformed, {
		x: d => d.timestring
	});

	// Convert to string even though it is one to make Typescript happy
	const minDate = extents.x[0]
		.toString()
		.split('T')[0]
		.split('-')
		.map(d => +d);
	const maxDate = extents.x[1]
		.toString()
		.split('T')[0]
		.split('-')
		.map(d => +d);

	const allDays = timeDay
		.range(
			new Date(Date.UTC(minDate[0], minDate[1] - 1, minDate[2])),
			new Date(Date.UTC(maxDate[0], maxDate[1] - 1, maxDate[2] + 1))
		)
		.map(d => d.toISOString().split('T')[0])
		.sort();
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 0, right: 15, bottom: 20, left: 75 }}
		x={xKey}
		y={yKey}
		xDomain={[0, 24 * 60 * 60]}
		yDomain={allDays}
		xScale={scaleTime()}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		xPadding={[padding, padding]}
		data={daysTransformed}
	>
		<Html>
			<AxisX
				ticks={[0, 4, 8, 12, 16, 20, 24].map(d => d * 60 * 60)}
				format={d => `${Math.floor(d / 60 / 60)}:00`}
			/>
			<AxisY />
			<Scatter {r} fill="rgba(255, 204, 0, 0.75)" strokeWidth={0} />
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
