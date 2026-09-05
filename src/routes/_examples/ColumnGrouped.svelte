<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import ColumnGrouped from '../../_components/ColumnGrouped.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// A flat list of rows, one per column: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'year';
	const x2Key = 'fruit';
	const yKey = 'value';

	const seriesColors = ['#ff00cc', '#00ccff', '#ffcc00'];

	// `x2="fruit"` is all it takes to position columns within each group. x2 is
	// a scaleBand by default. Its domain comes from the data and its range is
	// one x band wide. Pass `x2Scale` to customize the padding, for example
	// `x2Scale={scaleBand().paddingInner(0.1)}`. You could also skip `x2` and
	// build that band scale inside your own component.
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, bottom: 20, left: 20 }}
		x={xKey}
		x2={x2Key}
		y={yKey}
		c={x2Key}
		xScale={scaleBand().paddingInner(0.1).round(true)}
		yDomain={[0, null]}
		cRange={seriesColors}
		{data}
	>
		<Svg>
			<AxisX gridlines={false} />

			<AxisY snapBaselineLabel />
			<ColumnGrouped />
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
