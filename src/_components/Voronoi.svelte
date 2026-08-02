<!--
	@component
	Generates a Voronoi layer using [d3-delaunay](https://github.com/d3/d3-delaunay).
 -->
<script>
	import { uniques, getLayerCakeContext } from 'layercake';
	import { Delaunay } from 'd3-delaunay';

	const cake = getLayerCakeContext();

	/** @typedef {[number, number] & { data?: any }} Point */

	/**
	 * @typedef {Object} Props
	 * @property {string|undefined} [stroke] - An optional stroke color, which is likely only useful for testing to make sure the shapes drew correctly.
	 * @property {(event: MouseEvent, point: Array<number>) => void} [onmouseover] - A function that gets called on mouseover events. The first argument is the event, and the second is the point data.
	 */

	/** @type {Props} */
	let { stroke, onmouseover = () => {} } = $props();

	/**
	 * @param {MouseEvent} e
	 * @param {Point} point
	 */
	function log(e, point) {
		console.log(point, point.data);
		onmouseover(e, point);
	}

	/** @type {Point[]} */
	let points = $derived(
		cake.data.map(d => {
			/** @type {Point} */
			const point = [cake.xGet(d), cake.yGet(d)];
			point.data = d;
			return point;
		})
	);

	let uniquePoints = $derived(uniques(points, d => d.join(), false) ?? []);

	let voronoi = $derived(Delaunay.from(uniquePoints).voronoi([0, 0, cake.width, cake.height]));
</script>

<!--
	These cells are invisible mouse targets, not content, so they stay out of the
	accessibility tree. Making each one focusable would hand a keyboard user a tab
	stop per data point with nothing to read at any of them. Keyboard access
	belongs a level up: give the chart itself one tab stop, move between points
	with the arrow keys, and announce the current one from an `aria-live` region.
-->
{#each uniquePoints as point, i}
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<path
		style="stroke: {stroke}"
		class="voronoi-cell"
		d={voronoi.renderCell(i)}
		onmouseover={e => log(e, point)}
		aria-hidden="true"
	></path>
{/each}

<style>
	.voronoi-cell {
		fill: none;
		stroke: none;
		pointer-events: all;
		outline: none;
	}

	/* Useful to testing but you'll want to disable this for production */
	.voronoi-cell:hover {
		stroke: #333 !important;
		stroke-width: 3px;
	}
</style>
