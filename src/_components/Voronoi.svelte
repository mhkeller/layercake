<!--
	@component
	Generates a voronoi layer using [d3-delauney](https://github.com/d3/d3-delauney).
 -->
<script>
	import { getContext } from 'svelte';
	import { uniques } from 'layercake';
	import { Delaunay } from 'd3-delaunay';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

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
		$data.map(d => {
			/** @type {Point} */
			const point = [$xGet(d), $yGet(d)];
			point.data = d;
			return point;
		})
	);

	let uniquePoints = $derived(uniques(points, d => d.join(), false) ?? []);

	let voronoi = $derived(Delaunay.from(uniquePoints ?? []).voronoi([0, 0, $width, $height]));
</script>

{#each uniquePoints as point, i}
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<path
		style="stroke: {stroke}"
		class="voronoi-cell"
		d={voronoi.renderCell(i)}
		onmouseover={e => log(e, point)}
		role="tooltip"
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
