<script>
	import { LayerCake, Svg, flatten, uniques } from 'layercake';
	import { Stack } from 'layercake/transforms';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format, precisionFixed } from 'd3-format';

	import ColumnStacked from '../../_components/ColumnStacked.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = 'year';
	const yKey = [0, 1];
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#00e047', '#7ceb68', '#b7f486', '#ecfda5'];

	/* --------------------------------------------
	 * Cast data
	 */
	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const formatTickY = d => format(`.${precisionFixed(d)}s`)(d);
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<Stack {data} keys={seriesNames} let:stackData>
		<LayerCake
				padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
				x={d => d.data[xKey]}
				y={yKey}
				z={zKey}
				xScale={scaleBand().paddingInner([0.02]).round(true)}
				xDomain={uniques(data, xKey)}
				zScale={scaleOrdinal()}
				zDomain={seriesNames}
				zRange={seriesColors}
				flatData={flatten(stackData)}
				data={stackData}
		>
			<Svg>
				<AxisX
					gridlines={false}
				/>
				<AxisY
					ticks={4}
					gridlines={false}
					formatTick={formatTickY}
				/>
				<ColumnStacked/>
			</Svg>
		</LayerCake>
	</Stack>
</div>
