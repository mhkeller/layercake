<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';

	import ColumnStacked from '../../_components/ColumnStacked.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = 'year';
	const yKey = [0, 1];
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#00e047', '#7ceb68', '#b7f486', '#ecfda5'];

	const formatLabelY = d => format(`~s`)(d);

	const stackedData = stack(data, seriesNames);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={d => d.data[xKey]}
		y={yKey}
		z={zKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomainSort={false}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX gridlines={false} />
			<AxisY ticks={4} gridlines={false} format={formatLabelY} />
			<ColumnStacked />
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
