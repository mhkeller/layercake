<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import BarGrouped from '../../_components/BarGrouped.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// A flat list of rows, one per bar: { year, fruit, value }
	import data from '../../_data/yearGroupsLong.js';

	const xKey = 'value';
	const yKey = 'year';
	const y2Key = 'fruit';

	const seriesColors = ['#ff00cc', '#00ccff', '#ffcc00'];

	// With `percentRange` on, the y2 band is measured in percent, so the bars inside
	// each group share the ScaledSvg's units.
	// `y2="fruit"` is all it takes to position bars within each group. y2 is a
	// scaleBand by default. Its domain comes from the data and its range is one
	// y band tall. Pass `y2Scale` to customize the padding, for example
	// `y2Scale={scaleBand().paddingInner(0.1)}`. You could also skip `y2` and
	// build that band scale inside your own component.
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		y2={y2Key}
		c={y2Key}
		yScale={scaleBand().paddingInner(0.1)}
		xDomain={[0, null]}
		cRange={seriesColors}
		{data}
	>
		<Html>
			<AxisX tickMarks showBaseline snapLabels gridlines={false} />
			<AxisY tickMarks gridlines={false} />
		</Html>
		<ScaledSvg>
			<BarGrouped />
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
