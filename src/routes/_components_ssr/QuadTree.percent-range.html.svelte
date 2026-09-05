<script>
	import { LayerCake, Html } from 'layercake';

	import ScatterHtml from '../../_components/Scatter.percent-range.html.svelte';
	import QuadTreePercentRange from '../../_components/QuadTree.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	const padding = 6;
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 20 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Html>
			<ScatterHtml {r} />
			<QuadTreePercentRange>
				{#snippet children({ x, y, visible })}
					<div
						class="circle"
						style="top:{y}%;left:{x}%;display: {visible ? 'block' : 'none'};"
					></div>
				{/snippet}
			</QuadTreePercentRange>
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
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
