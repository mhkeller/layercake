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
	const y1Key = 'fruit';

	const seriesColors = ['#f0c', '#0cf', '#fc0'];

	// The y1 range comes from the y scale's bandwidth, so under `percentRange`
	// the nested offsets land in percent units too, same as everything else
	// inside the ScaledSvg.
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 0, right: 20, bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		y1={y1Key}
		c={y1Key}
		yScale={scaleBand().paddingInner(0.1)}
		xDomain={[0, null]}
		cRange={seriesColors}
		{data}
	>
		<Html>
			<AxisX gridlines baseline snapLabels />
			<AxisY gridlines={false} tickMarks />
		</Html>
		<ScaledSvg>
			<BarGrouped />
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
