<script>
	import { LayerCake, Svg } from 'layercake';

	import Voronoi from '../../_components/Voronoi.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	/**
	 * @param {MouseEvent} e
	 * @param {Array<number>} point
	 */
	function logEvent(e, point) {
		console.log('dispatched event', point);
	}
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} x={xKey} y={yKey} {data}>
		<Svg>
			<Voronoi stroke="#000" onmouseover={logEvent} />
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
