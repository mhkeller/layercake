<script>
	import { LayerCake, Svg, Html } from 'layercake';

	import Line from '../../_components/Line.svelte';
	import Area from '../../_components/Area.svelte';
	import Brush from '../../_components/Brush.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	let brushExtents = [null, null];

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let brushedData;
	$: {
		brushedData = data.slice(
			(brushExtents[0] || 0) * data.length,
			(brushExtents[1] || 1) * data.length
		);
		if (brushedData.length < 2) {
			brushedData = data.slice(brushExtents[0] * data.length, brushExtents[0] * data.length + 2);
		}
	}
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
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.brushed-chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>
