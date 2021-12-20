<script>
	/**
		Generates a voronoi layer using [d3-delauney](https://github.com/d3/d3-delauney).
		@type {String} [stroke=undefined] – An optional stroke color, which is likely only useful for testing to make sure the shapes drew correctly.
	*/
	import { getContext, createEventDispatcher } from 'svelte';
	import { uniques } from 'layercake';
	import { Delaunay } from 'd3-delaunay';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	export let stroke = undefined;

	let dispatcher = createEventDispatcher();

	function log (point) {
		console.log(point, point.data);
		dispatcher('voronoi-mouseover', point);
	}

	$: points = $data.map(d => {
		const point = [$xGet(d), $yGet(d)];
		point.data = d;
		return point;
	});

	$: uniquePoints = uniques(points, d => d.join(), false);

	$: voronoi = Delaunay.from(uniquePoints).voronoi([0, 0, $width, $height]);

</script>

<style>
	.voronoi-cell {
		fill: none;
		stroke: none;
		pointer-events: all;
		outline: none;
	}

	/* Useful to testing but you'll want to disable this for production */
	.voronoi-cell:hover {
		stroke: #000;
		stroke-width: 2px;
	}
</style>

{#each uniquePoints as point, i}
	<path
		style="{stroke ? `stroke:${stroke};` : ''}"
		class="voronoi-cell"
		d={voronoi.renderCell(i)}
		on:mouseover="{() => { log(point) }}"
		on:focus="{() => { log(point) }}"
	></path>
{/each}
