<script>
	import { LayerCake, Svg, Html } from 'layercake';

	import ScatterSvg from '../../_components/Scatter.svg.svelte';
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

<div class="chart-container">
	<LayerCake
		padding={{ top: 20 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Svg>
			<ScatterSvg {r} />
		</Svg>

		<Html>
			<QuadTree>
				{#snippet children({ x, y, visible })}
					<div
						class="circle"
						style="top:{y}px;left:{x}px;display: {visible ? 'block' : 'none'};"
					></div>
				{/snippet}
			</QuadTree>
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
