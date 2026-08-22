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

	const seriesColors = ['#f0c', '#0cf', '#fc0'];

	// `x2="fruit"` is the whole setup for the within-group position: x2 is a
	// scaleBand by default, its domain comes from the data, and its range is one
	// x band wide. Pass `x2Scale` if you want to customize the padding, such as:
	// x2Scale={scaleBand().paddingInner(0.1).round(true)}

	// Alternatively, the same chart works without `x2`
	// by deriving a scale inside your component:
	// const x2Scale = $derived(scaleBand().domain(fruits).range([0, k.xScale.bandwidth()]));
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, right: 0, bottom: 20, left: 20 }}
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
