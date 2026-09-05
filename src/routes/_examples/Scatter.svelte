<script>
	import { LayerCake, Svg, Canvas } from 'layercake';

	import ScatterSvg from '../../_components/Scatter.svg.svelte';
	import ScatterCanvas from '../../_components/Scatter.canvas.svelte';
	import Voronoi from '../../_components/Voronoi.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	const scalePadding = 10;

	// The Voronoi layer reports the point under the mouse. Its row is on `point.data`.
	/** @param {MouseEvent} e @param {any} point */
	function logPoint(e, point) {
		console.log(point.data);
	}
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[scalePadding, scalePadding]}
		yPadding={[scalePadding, scalePadding]}
		{data}
	>
		<Svg>
			<AxisX gridlines={false} />
			<AxisY gridlines={false} ticks={4} />
		</Svg>

		<Canvas>
			<ScatterCanvas r={r * 1.5} fill="#00ccff" />
		</Canvas>

		<Svg>
			<ScatterSvg {r} fill="#fff" />
			<Voronoi stroke="#333" onmouseover={logPoint} />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
