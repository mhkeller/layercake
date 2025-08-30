<script>
	import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import BarStacked from '../../_components/BarStacked.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = 'year';
	const yKey = [0, 1];
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const stackData = stack().keys(seriesNames);

	const series = stackData(data);

	const formatLabelX = d => format(`~s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 0, right: 0, bottom: 20, left: 35 }}
		y={d => d.data[xKey]}
		x={yKey}
		z={zKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomainSort={true}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(series)}
		data={series}
	>
		<Html>
			<AxisX baseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
		</Html>
		<ScaledSvg>
			<BarStacked />
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
