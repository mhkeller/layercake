<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import BarStacked from '../../_components/BarStacked.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = [0, 1];
	const yKey = 'year';
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	const formatLabelX = d => format(`~s`)(d);

	const stackedData = stack(data, seriesNames);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, bottom: 20, left: 35 }}
		x={xKey}
		y={d => d.data[yKey]}
		z={zKey}
		yScale={scaleBand().paddingInner(0.05)}
		zScale={scaleOrdinal()}
		yDomainSort={true}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX baseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
			<BarStacked />
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
