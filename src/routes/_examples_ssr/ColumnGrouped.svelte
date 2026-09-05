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

	const seriesColors = ['#f0c', '#0cf', '#fc0'];

	// The x2 range is one band of the x scale. With `percentRange` on, that
	// band is in percent, so the columns inside each group use the same units
	// as everything else in the ScaledSvg.
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
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
			<AxisY ticks={4} />
		</Html>
		<ScaledSvg>
			<ColumnGrouped />
		</ScaledSvg>
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
