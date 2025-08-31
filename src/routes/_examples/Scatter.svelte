<script>
	import { LayerCake, Svg, Canvas } from 'layercake';

	import ScatterSvg from '../../_components/Scatter.svg.svelte';
	import ScatterCanvas from '../../_components/Scatter.canvas.svelte';
	import Voronoi from '../../_components/Voronoi.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	const padding = 10;
	const color = '#fff';

	function logEvent(d) {
		console.log('dispatched event', d, d.detail);
	}
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Svg>
			<AxisX gridlines={false} />
			<AxisY gridlines={false} ticks={4} />
		</Svg>

		<Canvas>
			<ScatterCanvas r={r * 1.5} fill="#0cf" />
		</Canvas>

		<Svg>
			<ScatterSvg {r} fill={color} />
			<Voronoi stroke="#333" onmouseover={logEvent} />
		</Svg>
	</LayerCake>
</div>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
