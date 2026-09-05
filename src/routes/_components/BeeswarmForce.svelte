<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import Beeswarm from '../../_components/BeeswarmForce.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/us-senate.csv';

	const xKey = 'date_of_birth';
	const cKey = 'gender';
	const titleKey = 'name';

	const r = 6;

	const seriesNames = new Set();
	const seriesColors = ['#ffcc00', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[cKey]);

		return {
			[titleKey]: d[titleKey],
			[cKey]: d[cKey],
			[xKey]: +d[xKey].split('-')[0]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ left: 10, bottom: 15 }}
		x={xKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cDomain={Array.from(seriesNames)}
		cRange={seriesColors}
		data={dataTransformed}
	>
		{#snippet children(k)}
			<Svg>
				<Beeswarm
					r={k.width < 400 ? r / 1.25 : r}
					strokeWidth={1}
					xStrength={0.95}
					yStrength={0.075}
					getTitle={d => d[titleKey]}
				/>
			</Svg>
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
