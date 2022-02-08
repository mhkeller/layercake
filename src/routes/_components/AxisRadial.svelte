<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisRadial from '../../_components/AxisRadial.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/radarScores.csv';

	const seriesKey = 'name';
	const xKey = ['fastball', 'change', 'slider', 'cutter', 'curve'];

	const seriesNames = Object.keys(data[0]).filter(d => d !== seriesKey);

	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const padding = 35;
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: padding, right: padding, bottom: padding, left: padding}}
		x={xKey}
		xDomain={[0, 10]}
		xRange={({ height }) => [0, height / 2]}
		data={data}
	>
		<Svg>
			<AxisRadial/>
		</Svg>
	</LayerCake>
</div>
