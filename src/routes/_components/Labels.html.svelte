<script>
	import { LayerCake, Html } from 'layercake';

	import Labels from '../../_components/Labels.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const labels = data.filter((d, i) => {
		return i % 6 === 0;
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 20, left: 10, right: 10 }} x={xKey} y={yKey} {data}>
		<Html>
			<Labels getLabel={d => d[xKey]} {labels} />
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
