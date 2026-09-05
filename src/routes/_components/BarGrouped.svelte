<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import BarGrouped from '../../_components/BarGrouped.svelte';

	// A flat list of rows, one per bar: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'value';
	const yKey = 'year';
	const y2Key = 'fruit';
	const cKey = 'fruit';
</script>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10 }}
		x={xKey}
		y={yKey}
		y2={y2Key}
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
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
