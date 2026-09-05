<script>
	import { LayerCake, Html } from 'layercake';

	import Scatter from '../../_components/Scatter.percent-range.html.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	// In percent units, so smaller than the client-side version's 10 pixels
	const scalePadding = 2.5;
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[scalePadding, scalePadding]}
		yPadding={[scalePadding, scalePadding]}
		{data}
	>
		<Html>
			<AxisX gridlines={false} />
			<AxisY gridlines={false} ticks={4} />
			<!-- The client-side version draws these over a canvas layer. There is no canvas on the server, so the dots get a stroke instead. -->
			<Scatter {r} fill="#fff" stroke="#00ccff" strokeWidth={1.5} />
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
