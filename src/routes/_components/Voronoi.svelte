<script>
	import { LayerCake, Svg } from 'layercake';

	import Voronoi from '../../_components/Voronoi.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

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
