<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import Key from '../../_components/Key.html.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import BeeswarmForce from '../../_components/BeeswarmForce.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/us-senate.csv';

	const xKey = 'date_of_birth';
	const cKey = 'gender';
	const titleKey = 'name';

	const r = 6;

	const seriesColors = ['#ffcc00', '#000'];

	// Keep just the fields the chart reads. The x value is the birth year, the
	// first part of the date string.
	const rows = data.map(d => ({
		[titleKey]: d[titleKey],
		[cKey]: d[cKey],
		[xKey]: +String(d[xKey]).split('-')[0]
	}));
</script>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 15 }}
		x={xKey}
		c={cKey}
		cScale={scaleOrdinal()}
		cRange={seriesColors}
		cDomainSort={true}
		data={rows}
	>
		<Svg>
			<AxisX />
			<BeeswarmForce
				{r}
				strokeWidth={1}
				xStrength={0.95}
				yStrength={0.075}
				getTitle={d => d[titleKey]}
			/>
		</Svg>

		<Html pointerEvents={false}>
			<Key shape="circle" />
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
