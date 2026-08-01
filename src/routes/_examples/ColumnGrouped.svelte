<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import ColumnGrouped from '../../_components/ColumnGrouped.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// A flat list of rows, one per column: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'year';
	const x1Key = 'fruit';
	const yKey = 'value';

	// The x scale is a band scale of years and the x1 scale positions
	// each fruit within its year's band. The x1 domain is computed from
	// the data and its range defaults to the x scale's bandwidth.
	// You could customize it by setting the `x1Range` prop to a function
	// that receives sibling scales, e.g.
	// x1Range={({ scales }) => [0, scales.x.bandwidth() / 2]}
	//
	// The c scale colors each column by fruit.
	//
	// If you prefer no library support, the same chart works without `x1`
	// by deriving a scale inside your component:
	// const x1Scale = $derived(scaleBand().domain(fruits).range([0, c.xScale.bandwidth()]));
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, right: 0, bottom: 20, left: 20 }}
		x={xKey}
		x1={x1Key}
		y={yKey}
		c={x1Key}
		xScale={scaleBand().paddingInner(0.1).round(true)}
		x1Scale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={[0, null]}
		cRange={['#fc0', '#c0f', '#00e047']}
		{data}
	>
		<Svg>
			<AxisX gridlines={false} />

			<AxisY snapBaselineLabel />
			<ColumnGrouped showLabels />
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
