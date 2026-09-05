<script>
	import { LayerCake, Svg } from 'layercake';
	import { group } from 'd3-array';
	import { scaleQuantize } from 'd3-scale';

	import CalendarMonth from '../../_components/CalendarMonth.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import dates from '../../_data/dates-april.csv';

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const gutter = 10;
	const seriesColors = ['#fff5cc', '#ffeba9', '#ffe182', '#ffd754', '#ffcc00'];

	/** @param {{ timestring: string }} d */
	const monthOf = d => new Date(d.timestring).getUTCMonth();
	/** @param {{ timestring: string }} d */
	const dayOf = d => d.timestring.split('T')[0];

	// Group the rows by month, then by day. Each month becomes one chart.
	const byMonth = group(dates, monthOf, dayOf);
	const months = Array.from(byMonth, ([month, byDay]) => ({
		month,
		days: Array.from(byDay, ([date, rows]) => ({ date, rows }))
	})).sort((a, b) => a.month - b.month);
</script>

{#each months as { month, days }, i}
	<div
		class="calendar-container"
		style="width:calc({80 / months.length}% - {gutter}px);{i === 0
			? `margin-right:${gutter * 2}px`
			: ''}"
		data-month={monthNames[month]}
	>
		<LayerCake
			padding={{ right: 20 }}
			x="date"
			c={d => d.rows.length}
			cScale={scaleQuantize()}
			cRange={seriesColors}
			data={days}
		>
			<Svg>
				<CalendarMonth />
			</Svg>
		</LayerCake>
	</div>
{/each}

<style>
	/* Give the wrapper a width and height. LayerCake fills it. The width is set inline below. */
	.calendar-container {
		--margin-top: 25px;
		display: inline-block;
		position: relative;
		vertical-align: top;
		height: calc(100% - var(--margin-top));
		margin-top: var(--margin-top);
	}
	.calendar-container:before {
		content: attr(data-month);
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(0, -100%);
	}
</style>
