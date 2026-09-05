<script>
	import { LayerCake, WebGL, Html } from 'layercake';

	import ScatterWebgl from '../../_components/Scatter.webgl.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import QuadTree from '../../_components/QuadTree.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	// In percent units, so smaller than the client-side version's 6 pixels
	const xyPadding = 2;
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 5, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[xyPadding, xyPadding]}
		yPadding={[xyPadding, xyPadding]}
		{data}
	>
		<Html>
			<AxisX />
			<AxisY tickMarks={false} ticks={5} />
		</Html>

		<WebGL>
			<ScatterWebgl {r} />
		</WebGL>

		<Html>
			<QuadTree>
				{#snippet children({ x, y, visible })}
					<div
						class="circle"
						style="top:{y}%;left:{x}%;display: {visible ? 'block' : 'none'};"
					></div>
				{/snippet}
			</QuadTree>
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
	.circle {
		position: absolute;
		border-radius: 50%;
		background-color: rgba(171, 0, 214);
		transform: translate(-50%, -50%);
		pointer-events: none;
		width: 10px;
		height: 10px;
	}
</style>
