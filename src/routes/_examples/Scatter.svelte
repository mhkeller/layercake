<script>
	import { LayerCake, Svg, Canvas } from 'layercake';

	import ScatterSvg from '../../components/Scatter.svg.svelte';
	import ScatterCanvas from '../../components/Scatter.canvas.svelte';
	import Voronoi from '../../components/Voronoi.svelte';
	import AxisX from '../../components/AxisX.svelte';
	import AxisY from '../../components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	const r = 3;
	const padding = 10;
	const color = '#fff';

	function logEvent(d) {
		console.log('dispatched event', d, d.detail);
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		data={data}
	>
		<Svg>
			<AxisX
				gridlines={false}
			/>
			<AxisY
				gridlines={false}
				ticks={4}
			/>
		</Svg>

		<Canvas>
			<ScatterCanvas
				r={r * 1.5}
				fill={'#0cf'}
			/>
		</Canvas>

		<Svg>
			<ScatterSvg
				{r}
				fill={color}
			/>
			<Voronoi
				stroke="#333"
				on:voronoi-mouseover={logEvent}
			/>
		</Svg>
	</LayerCake>
</div>
