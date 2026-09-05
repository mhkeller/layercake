<script>
	import { LayerCake, Svg, Html } from 'layercake';

	import Line from '../../_components/Line.svelte';
	import Area from '../../_components/Area.svelte';
	import Brush from '../../_components/Brush.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	/** @type {[number|null, number|null]} */
	let brushExtents = $state([null, null]);

	const xKey = 'myX';
	const yKey = 'myY';

	// The rows inside the brush, with at least two so the line still draws when the brush is very narrow
	let brushedData = $derived.by(() => {
		const start = (brushExtents[0] ?? 0) * data.length;
		const end = (brushExtents[1] ?? 1) * data.length;
		const selection = data.slice(start, end);
		if (selection.length < 2) return data.slice(start, start + 2);
		return selection;
	});
</script>

<div class="brushed-chart-container">
	<LayerCake
		padding={{ top: 20, bottom: 20 }}
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		data={brushedData}
	>
		<Svg>
			<Line stroke="#00e047" />
			<Area fill="#00e04710" />
		</Svg>
	</LayerCake>
</div>

<div class="brush-container">
	<LayerCake padding={{ top: 5 }} x={xKey} y={yKey} yDomain={[0, null]} {data}>
		<Svg>
			<Line stroke="#00e047" />
			<Area fill="#00e04710" />
		</Svg>
		<Html>
			<Brush bind:min={brushExtents[0]} bind:max={brushExtents[1]} />
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.brushed-chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>
