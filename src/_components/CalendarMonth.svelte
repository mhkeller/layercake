<!--
	@component
	Generates an SVG calendar chart.
 -->
<script>
	import { getContext } from 'svelte';
	import { timeFormat } from 'd3-time-format';
	import { timeDay } from 'd3-time';

	const { width, height, data, x, z, zScale, extents } = getContext('LayerCake');

	/** @type {Function} [calcCellSize=(w, h) => Math.min(w / 7, h / 5)] - A function givn the canvas width and height as arguments and expects a return number that will be used as the width and height for each cell. The default will choose a size that fits seven cells across and five rows top to bottom. */
	export let calcCellSize = (w, h) => Math.min(w / 7, h / 5);

	const getDayOfWeek = timeFormat('%w');
	const getWeekOfYear = timeFormat('%U');

	$: count = date => {
		const stringDate = date.toISOString().split('T')[0];
		const days = $data.filter(d => $x(d) === stringDate)[0];
		if (days) {
			return $z(days);
		}
		return 0;
	};

	$: fillColor = day => {
		const n = count(day);
		return n ? $zScale(n) : '#fff';
	};

	$: cellSize = calcCellSize($width, $height);

	let days;

	/* --------------------------------------------
	 * Calculate what month we're in and generate the full days of that month
	 */
	$: {
		const minDate = $extents.x[0];
		const parts = minDate.split('-').map(d => +d);

		days = timeDay.range(
			new Date(Date.UTC(parts[0], parts[1] - 1, 1)),
			new Date(Date.UTC(parts[0], parts[1], 1))
		);
	}

	$: rectX = day => getDayOfWeek(day) * cellSize;
	$: rectY = day => {
		const startWeek = getWeekOfYear(new Date(day.getUTCFullYear(), day.getUTCMonth(), 1));
		const thisWeek = getWeekOfYear(day);
		const weekDiff = thisWeek - startWeek;
		return weekDiff * cellSize;
	};

	function showCount(day) {
		console.log(day, count(day));
	}
</script>

{#each days as day}
	<rect
		class="day"
		width={cellSize}
		height={cellSize}
		x={rectX(day)}
		y={rectY(day)}
		style="fill:{fillColor(day)};"
		on:mouseenter={showCount(day)}
	/>
{/each}

<style>
	.day {
		stroke: #000;
		stroke-width: 1;
		fill: #fff;
	}
</style>
