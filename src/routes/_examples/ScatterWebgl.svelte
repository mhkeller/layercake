<script>
	import { LayerCake, Svg, WebGL, Html } from 'layercake';

	import ScatterWebGL from '../../_components/Scatter.webgl.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import QuadTree from '../../_components/QuadTree.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	const padding = 6;

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
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
		height: 250px;
	}
	.circle {
		position: absolute;
		border-radius: 50%;
		background-color: rgba(171,0, 214);
		transform: translate(-50%, -50%);
		pointer-events: none;
		width: 10px;
		height: 10px;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		data={data}
	>
		<Svg>
			<AxisX/>
			<AxisY
				ticks={5}
			/>
		</Svg>

		<WebGL>
			<ScatterWebGL
				{r}
			/>
		</WebGL>

		<Html>
			<QuadTree
				let:x
				let:y
				let:visible
			>
				<div
					class="circle"
					style="top:{y}px;left:{x}px;display: { visible ? 'block' : 'none' };"
				></div>
			</QuadTree>
		</Html>
	</LayerCake>
</div>
