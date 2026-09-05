<script>
	import { LayerCake, Html } from 'layercake';

	import CirclePack from '../../_components/CirclePack.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/fruitGroups.csv';

	const idKey = 'fruit';
	const valueKey = 'value';
</script>

<div class="chart-container">
	<LayerCake padding={{ bottom: 20, left: 30 }} {data}>
		<Html>
			<CirclePack
				{idKey}
				{valueKey}
				fill="#ff00cc"
				stroke="#9f0080"
				textFill="#61004e"
				textStroke="#ffdbf8"
				textStrokeWidth={1}
			/>
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
