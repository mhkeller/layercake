<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	import ClevelandDotPlot from '../../_components/ClevelandDotPlot.percent-range.html.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruitOrdinal.csv';

	const yKey = 'year';
	const xKey = Object.keys(data[0]).filter(d => d !== yKey);

	const seriesColors = ['#f0c', '#00bbff', '#00e047', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ right: 10, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomainSort={true}
		xDomain={[0, null]}
		xPadding={[2, 0]}
		zScale={scaleOrdinal()}
		zDomain={xKey}
		zRange={seriesColors}
		{data}
	>
		<Html>
			<AxisX />
			<AxisY gridlines={false} />
			<ClevelandDotPlot />
		</Html>
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
