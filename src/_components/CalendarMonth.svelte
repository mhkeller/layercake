<!--
	@component
	Generates an SVG calendar for one month, one square per day, colored by the `c` scale. The x accessor must give each row a `YYYY-MM-DD` date string, and the x scale should be a `scaleBand()` since the dates are categories, not numbers.
 -->
<script>
	import { utcFormat } from 'd3-time-format';
	import { utcDay } from 'd3-time';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {(w: number, h: number) => number} [calcCellSize] - Returns the size of each day's square, given the chart width and height. The default fits seven columns across and five rows down.
	 */

	/** @type {Props} */
	let { calcCellSize = (w, h) => Math.min(w / 7, h / 5) } = $props();

	const getDate = utcFormat('%Y-%m-%d');
	const getDayOfWeek = utcFormat('%w');
	const getWeekOfYear = utcFormat('%U');

	// The c value of the row for this day, or undefined when the day has no row
	/** @param {Date} date */
	function getDayValue(date) {
		const dateString = date.toISOString().split('T')[0];
		const row = k.data.find(d => k.x(d) === dateString);
		return row === undefined ? undefined : k.c?.(row);
	}

	// Days with no row, and charts with no c dimension, stay white
	/** @param {Date} day */
	function getFill(day) {
		const value = getDayValue(day);
		return value === undefined ? '#fff' : (k.cScale?.(value) ?? '#fff');
	}

	let cellSize = $derived(calcCellSize(k.width, k.height));

	// Every day of the month that the earliest x value falls in. The extent is a
	// min and max on a linear scale and a list of values on a band scale, so
	// sort either way.
	/** @type {Date[]} */
	let days = $derived.by(() => {
		const earliest = [...k.extents.x].map(String).sort()[0];
		const [year, month] = earliest.split('-').map(Number);
		return utcDay.range(new Date(Date.UTC(year, month - 1, 1)), new Date(Date.UTC(year, month, 1)));
	});

	// Columns are days of the week, rows are weeks counted from the month's first day
	/** @param {Date} day */
	function rectX(day) {
		return +getDayOfWeek(day) * cellSize;
	}
	/** @param {Date} day */
	function rectY(day) {
		const firstOfMonth = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), 1));
		const weekDiff = +getWeekOfYear(day) - +getWeekOfYear(firstOfMonth);
		return weekDiff * cellSize;
	}
</script>

{#each days as day}
	<rect
		class="day"
		width={cellSize}
		height={cellSize}
		x={rectX(day)}
		y={rectY(day)}
		style="fill:{getFill(day)};"><title>{getDate(day)}</title></rect
	>
{/each}

<style>
	.day {
		stroke: #000;
		stroke-width: 1;
		fill: #fff;
	}
</style>
