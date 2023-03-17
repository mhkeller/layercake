<script>
	import { LayerCake, ScaledSvg } from 'layercake';
	import { nest } from 'd3-collection';
	import { scaleQuantize } from 'd3-scale';

	import CalendarMonth from '../../_components/CalendarMonth.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import dates from '../../_data/dates.csv';

	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const datesTransformed = dates.map(row => {
		row.date = new Date(row.timestring);
		return row;
	});

	const gutter = 10;
	const seriesColors = ['#fff5cc', '#ffeba9', '#ffe182', '#ffd754', '#ffcc00'];

	/* --------------------------------------------
	 * Group by month then by date
	 */
	const byMonthByDate = nest()
		.key(d => d.date.getUTCMonth())
		.key(d => d.timestring.split('T')[0])
		.entries(datesTransformed);

	const sortedData = byMonthByDate.sort((a, b) => a.key - b.key);
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
		The width is being set inline-below.
	*/
	.chart-container {
		--margin-top: 25px;
		display: inline-block;
		position: relative;
		vertical-align: top;
		height: calc(250px - var(--margin-top));
		margin-top: var(--margin-top);
	}
	.chart-container:before {
		content: attr(data-month);
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(0, -100%);
	}
</style>

{#each sortedData as month, i}
	<div
		class="chart-container"
		style="width:calc({100 / sortedData.length}% - {gutter}px);{i === 0 ? `margin-right:${gutter * 2}px` : ''}"
		data-month="{monthNames[+month.key + 1]}"
	>
		<LayerCake
			ssr={true}
			percentRange={true}
			padding={{ top: 1, right: 1, bottom: 1, left: 1 }}
			x={'key'}
			z={d => d.values.length}
			zScale={scaleQuantize()}
			zRange={seriesColors}
			data={month.values}
		>
			<ScaledSvg>
				<CalendarMonth
					calcCellSize={(w, h) => 100 / 7}
				/>
			</ScaledSvg>
		</LayerCake>
	</div>
{/each}
