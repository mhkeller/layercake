<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import BarGrouped from '../../_components/BarGrouped.svelte';

	// A flat list of rows, one per bar: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'value';
	const yKey = 'year';
	const y1Key = 'fruit';
	const cKey = 'fruit';
</script>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10 }}
		x={xKey}
		y={yKey}
		y1={y1Key}
		c={cKey}
		yScale={scaleBand().paddingInner(0.1).round(true)}
		xDomain={[0, null]}
		{data}
	>
		<Svg>
			<BarGrouped />
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
