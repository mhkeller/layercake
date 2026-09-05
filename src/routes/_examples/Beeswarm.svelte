<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { format } from 'd3-format';
	import { scaleOrdinal } from 'd3-scale';

	import Key from '../../_components/Key.html.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import Beeswarm from '../../_components/Beeswarm.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/cars-2.csv';

	const xKey = 'Weight_in_lbs';
	const cKey = 'Origin';
	const titleKey = 'Name';

	const r = 4;

	const seriesColors = ['#ccc', '#ffcc00', '#000'];

	// Keep just the fields the chart reads
	const rows = data.map(d => ({
		[titleKey]: d[titleKey],
		[xKey]: d[xKey],
		[cKey]: d[cKey]
	}));

	const addCommas = format(',');
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
		{#snippet children(k)}
			<Svg>
				<AxisX showBaseline format={addCommas} tickMarks />
				<!-- The Beeswarm component keeps each original row under `data`, so read `titleKey` from there -->
				<Beeswarm r={k.width < 400 ? r / 1.6 : r} spacing={1} getTitle={d => d[titleKey]} />
			</Svg>

			<Html pointerEvents={false}>
				<Key
					align="end"
					shape="circle"
					lookup={{
						USA: 'U.S.'
					}}
				/>
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
