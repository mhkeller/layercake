<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Bar from '../../_components/Bar.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/groups.csv';

	const xKey = 'value';
	const yKey = 'year';
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05)}
		xDomain={[0, null]}
		{data}
	>
		<Html>
			<AxisX tickMarks showBaseline snapLabels />
			<AxisY tickMarks gridlines={false} />
		</Html>
		<ScaledSvg>
			<Bar />
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
