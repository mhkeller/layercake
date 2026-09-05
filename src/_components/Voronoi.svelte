<!--
	@component
	Generates a Voronoi layer using [d3-delaunay](https://github.com/d3/d3-delaunay).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { Delaunay } from 'd3-delaunay';

	const k = getLayerCakeContext();

	/** @typedef {[number, number] & { data?: any }} Point */

	/**
	 * @typedef {Object} Props
	 * @property {string|undefined} [stroke] - A stroke color for the cells, handy for seeing where they are.
	 * @property {(event: MouseEvent, point: Array<number>) => void} [onmouseover] - Called when the mouse enters a cell with the event and the cell's `[x, y]` point. The point's row is on `point.data`.
	 */

	/** @type {Props} */
	let { stroke, onmouseover = () => {} } = $props();

	/**
	 * @param {MouseEvent} e
	 * @param {Point} point
	 */
	function handleMouseover(e, point) {
		onmouseover(e, point);
	}

	/** @type {Point[]} */
	let points = $derived(
		k.data.map(d => {
			/** @type {Point} */
			const point = [k.xGet(d), k.yGet(d)];
			point.data = d;
			return point;
		})
	);

	// Two rows at the same spot would make a zero-area cell, so keep the first point per spot
	let uniquePoints = $derived.by(() => {
		const seen = new Set();
		return points.filter(point => {
			const key = point.join();
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	});

	// The cells need a chart with room to draw in. While a page is being taken
	// down the container measures zero for a moment, and d3-delaunay rejects a
	// zero-size bounding box, so there are no cells until the chart has a size.
	let voronoi = $derived(
		k.width > 0 && k.height > 0
			? Delaunay.from(uniquePoints).voronoi([0, 0, k.width, k.height])
			: null
	);
</script>

<!--
	The cells are invisible hit areas, not content, so they are hidden from screen
	readers. Focusable cells would give keyboard users one stop per point with nothing to read.
-->
{#if voronoi}
	{#each uniquePoints as point, i}
		<!-- svelte-ignore a11y_mouse_events_have_key_events -->
		<path
			style="stroke: {stroke}"
			class="voronoi-cell"
			d={voronoi.renderCell(i)}
			onmouseover={e => handleMouseover(e, point)}
			aria-hidden="true"
		></path>
	{/each}
{/if}

<style>
	.voronoi-cell {
		fill: none;
		stroke: none;
		pointer-events: all;
		outline: none;
	}
</style>
