<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import BeeswarmHtml from '../../_components/Beeswarm.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/cars-2.csv';

	const xKey = 'Weight_in_lbs';
	const zKey = 'Origin';
	const titleKey = 'Name';

	const r = 4;

	const seriesNames = new Set();
	const seriesColors = ['#ccc', '#fc0', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[zKey]);
		return {
			[titleKey]: d[titleKey],
			[xKey]: +d[xKey],
			[zKey]: d[zKey]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={[...seriesNames].sort()}
		zRange={seriesColors}
		data={dataTransformed}
	>
		{#snippet children({ width })}
			<Html>
				<!-- The Beeswarm component transforms the data and nests our original fields under `data` so access the `titleKey` under that -->
				<BeeswarmHtml r={width < 400 ? r / 1.6 : r} spacing={1} getTitle={d => d.data[titleKey]} />
			</Html>
		{/snippet}
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
