<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import ColumnGrouped from '../../_components/ColumnGrouped.svelte';

	// A flat list of rows, one per column: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'year';
	const x2Key = 'fruit';
	const yKey = 'value';
	const cKey = 'fruit';
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		x2={x2Key}
		y={yKey}
		c={cKey}
		xScale={scaleBand().paddingInner(0.1).round(true)}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<ColumnGrouped />
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
