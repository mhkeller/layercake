<script>
	import { LayerCake, Svg } from 'layercake';

	import Area from '../../_components/Area.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';
</script>

<div class="chart-container">
	<LayerCake x={xKey} y={yKey} yDomain={[0, null]} {data}>
		<Svg>
			<Area fill="#ff7ac7" />
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
