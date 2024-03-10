<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';

	import ClevelandDotPlot from '../../_components/ClevelandDotPlot.percent-range.html.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruitOrdinal.csv';

	const yKey = 'year';
	const xKey = Object.keys(data[0]).filter(d => d !== yKey);

	const seriesColors = ['#f0c', '#00bbff', '#00e047', '#ff7a33'];

	data.forEach(d => {
		xKey.forEach(name => {
			d[name] = +d[name];
		});
	});
</script>

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

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ right: 10, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		xDomain={[0, null]}
		xPadding={[2, 0]}
		zScale={scaleOrdinal()}
		zDomain={xKey}
		zRange={seriesColors}
		data={data}
	>
		<Html>
			<AxisX/>
			<AxisY
				gridlines={false}
			/>
			<ClevelandDotPlot/>
		</Html>
	</LayerCake>
</div>
