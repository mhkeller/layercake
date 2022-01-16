<script>
	import { LayerCake, Svg, Html } from 'layercake';

	import Line from '../../components/Line.svelte';
	import Area from '../../components/Area.svelte';
	import AxisX from '../../components/AxisX.svelte';
	import AxisY from '../../components/AxisY.svelte';
	import Brush from '../../components/Brush.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/points.csv';

	let brushExtents = [null, null];

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let brushedData;
	$: {
		brushedData = data.slice((brushExtents[0] || 0) * data.length, (brushExtents[1] || 1) * data.length);
		if (brushedData.length < 2) {
			brushedData = data.slice(brushExtents[0] * data.length, brushExtents[0] * data.length + 2)
		}
	}
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		data={brushedData}
	>
		<Svg>
			<AxisX
				ticks={ticks => {
					const filtered = ticks.filter(t => t % 1 === 0);
					if (filtered.length > 7) {
						return filtered.filter((t, i) => i % 2 === 0);
					}
					return filtered;
				}}
			/>
			<AxisY
				ticks={4}
			/>
			<Line
				stroke='#00e047'
			/>
			<Area
				fill='#00e04710'
			/>
		</Svg>
	</LayerCake>
</div>

<div class="brush-container">
	<LayerCake
		padding={{ top: 5 }}
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		data={data}
	>
		<Svg>
			<Line
				stroke='#00e047'
			/>
			<Area
				fill='#00e04710'
			/>
		</Svg>
		<Html>
			<Brush bind:min={brushExtents[0]} bind:max={brushExtents[1]}/>
		</Html>
	</LayerCake>
</div>
