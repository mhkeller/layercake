<script>
	import { LayerCake, Svg } from 'layercake';

	import Radar from '../../_components/Radar.svelte';
	import AxisRadial from '../../_components/AxisRadial.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/radarScores.csv';

	// One axis per pitch type. Each row's five scores become one polygon.
	const xKey = ['fastball', 'change', 'slider', 'cutter', 'curve'];
</script>

<div class="chart-container">
	<!-- The x scale maps a score to a radius, so its range runs from the centre out to half the chart height -->
	<LayerCake
		padding={{ top: 30, bottom: 7 }}
		x={xKey}
		xDomain={[0, 10]}
		xRange={({ height }) => [0, height / 2]}
		{data}
	>
		<Svg>
			<AxisRadial />
			<Radar />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
