<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import BeeswarmHtml from '../../_components/Beeswarm.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/cars-2.csv';

	const xKey = 'Weight_in_lbs';
	const cKey = 'Origin';
	const titleKey = 'Name';

	const r = 4;

	const seriesNames = new Set();
	const seriesColors = ['#ccc', '#ffcc00', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[cKey]);
		return {
			[titleKey]: d[titleKey],
			[xKey]: +d[xKey],
			[cKey]: d[cKey]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		x={xKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cDomain={[...seriesNames].sort()}
		cRange={seriesColors}
		data={dataTransformed}
	>
		{#snippet children(k)}
			<Html>
				<BeeswarmHtml r={k.width < 400 ? r / 1.6 : r} spacing={1} getTitle={d => d[titleKey]} />
			</Html>
		{/snippet}
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
