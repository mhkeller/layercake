<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import BarGrouped from '../../_components/BarGrouped.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// A flat list of rows, one per bar: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'value';
	const yKey = 'year';
	const y2Key = 'fruit';

	const seriesColors = ['#f0c', '#0cf', '#fc0'];

	// `y2="fruit"` is the whole setup for the within-group position: y2 is a
	// scaleBand by default, its domain comes from the data, and its range is one
	// y band tall. Pass `y2Scale` if you want to customize the padding, such as:
	// y2Scale={scaleBand().paddingInner(0.1).round(true)}

	// Alternatively, the same chart works without `y2`
	// by deriving a scale inside your component:
	// const y2Scale = $derived(scaleBand().domain(fruits).range([0, k.yScale.bandwidth()]));
</script>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		y2={y2Key}
		c={y2Key}
		yScale={scaleBand().paddingInner(0.1).round(true)}
		xDomain={[0, null]}
		cRange={seriesColors}
		{data}
	>
		<Svg>
			<AxisX tickMarks baseline snapLabels gridlines={false} />
			<AxisY tickMarks gridlines={false} />
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
