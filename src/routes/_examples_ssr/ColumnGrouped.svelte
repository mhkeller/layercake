<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import ColumnGrouped from '../../_components/ColumnGrouped.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// A flat list of rows, one per column: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'year';
	const x2Key = 'fruit';
	const yKey = 'value';

	const seriesColors = ['#ff00cc', '#00ccff', '#ffcc00'];

	// With `percentRange` on, the x2 band is measured in percent, so the columns inside
	// each group share the ScaledSvg's units.
	// `x2="fruit"` is all it takes to position columns within each group. x2 is
	// a scaleBand by default. Its domain comes from the data and its range is
	// one x band wide. Pass `x2Scale` to customize the padding, for example
	// `x2Scale={scaleBand().paddingInner(0.1)}`. You could also skip `x2` and
	// build that band scale inside your own component.
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 10, bottom: 20, left: 20 }}
		x={xKey}
		x2={x2Key}
		y={yKey}
		c={x2Key}
		xScale={scaleBand().paddingInner(0.1)}
		yDomain={[0, null]}
		cRange={seriesColors}
		{data}
	>
		<Html>
			<AxisX gridlines={false} />
			<AxisY snapBaselineLabel />
		</Html>
		<ScaledSvg>
			<ColumnGrouped />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
