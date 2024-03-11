<script>
	import { LayerCake, Svg } from 'layercake';
	import { curveCardinal } from 'd3-shape';

	import Area from '../../_components/Area-D3.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
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
		height: 250px;
	}
</style>

<div class="chart-container">
	<LayerCake
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<Area
				fill="#f0c"
				curve={curveCardinal}
			/>
		</Svg>
	</LayerCake>
</div>
