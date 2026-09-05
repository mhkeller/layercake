<script>
	import { LayerCake, Html } from 'layercake';

	import Scatter from '../../_components/Scatter.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 4.5;
	const padding = 2.5;
	const fill = '#fff';
	const stroke = '#00ccff';
	const strokeWidth = 1.5;
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Html>
			<Scatter {r} {fill} {stroke} {strokeWidth} />
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
