<!--
	@component
	Generates an SVG calendar chart.
 -->
<script>
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { utcFormat } from 'd3-time-format';
	import { utcDay } from 'd3-time';

	const { width, height, data, x, z, zScale, extents } = getContext('LayerCake');

	
	/**
	 * @typedef {Object} Props
	 * @property {Function} [calcCellSize] - A function givn the canvas width and height as arguments and expects a return number that will be used as the width and height for each cell. The default will choose a size that fits seven cells across and five rows top to bottom.
	 */

	/** @type {Props} */
	let { calcCellSize = (w, h) => Math.min(w / 7, h / 5) } = $props();

	const getDate = utcFormat('%Y-%m-%d');
	const getDayOfWeek = utcFormat('%w');
	const getWeekOfYear = utcFormat('%U');

	let count = $derived(date => {
		const stringDate = date.toISOString().split('T')[0];
		const days = $data.filter(d => $x(d) === stringDate)[0];
		if (days) {
			return $z(days);
		}
		return 0;
	});

	let fillColor = $derived(day => {
		const n = count(day);
		return n ? $zScale(n) : '#fff';
	});

	let cellSize = $derived(calcCellSize($width, $height));

	let days = $state();

	/* --------------------------------------------
	 * Calculate what month we're in and generate the full days of that month
	 */
	run(() => {
		const minDate = $extents.x[0];
		const parts = minDate.split('-').map(d => +d);

		days = utcDay.range(
			new Date(Date.UTC(parts[0], parts[1] - 1, 1)),
			new Date(Date.UTC(parts[0], parts[1], 1))
		);
	});

	let rectX = $derived(day => getDayOfWeek(day) * cellSize);
	let rectY = $derived(day => {
		const startWeek = getWeekOfYear(new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), 1)));
		const thisWeek = getWeekOfYear(day);
		const weekDiff = thisWeek - startWeek;
		return weekDiff * cellSize;
	});

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
		onmouseenter={() => showCount(day)}
		role="tooltip"><title>{getDate(day)}</title></rect
	>
{/each}

<style>
	.day {
		stroke: #000;
		stroke-width: 1;
		fill: #fff;
	}
</style>
