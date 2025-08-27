<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomain={[1979, 1980, 1981, 1982, 1983]}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<Column />
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
