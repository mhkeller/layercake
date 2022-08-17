<script>
	import { LayerCake, Svg, flatten } from 'layercake';
	import { Stack } from 'layercake/transforms';

	import { scaleOrdinal } from 'd3-scale';
	import { format, precisionFixed } from 'd3-format';
	import { timeParse, timeFormat } from 'd3-time-format';

	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import AreaStacked from '../../_components/AreaStacked.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = [0, 1];
	const zKey = 'key';
	const xKeyCast = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	const formatTickX = timeFormat('%b. %-d')
	const formatTickY = d => format(`.${precisionFixed(d)}s`)(d);

	/* --------------------------------------------
	 * Cast data
	 */
	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string'
			? xKeyCast(d[xKey])
			: d[xKey];

		seriesNames.forEach(name => {
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<!-- Use the Stack component to transform the data into a stack format -->
	<Stack {data} keys={seriesNames} let:stackData>
		<LayerCake
			padding={{ top: 0, right: 0, bottom: 20, left: 17 }}
			x={d => d.data[xKey]}
			y={yKey}
			z={zKey}
			zScale={scaleOrdinal()}
			zDomain={seriesNames}
			zRange={seriesColors}
			flatData={flatten(stackData)}
			data={stackData}
		>
			<Svg>
				<AxisX
					formatTick={formatTickX}
					tickMarks={true}
				/>
				<AxisY
					formatTick={formatTickY}
				/>
				<AreaStacked/>
			</Svg>
		</LayerCake>
	</Stack>
</div>
