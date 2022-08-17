<script>
	import { LayerCake, Svg, Html, flatten } from 'layercake';
	import { SeriesLonger } from 'layercake/transforms';

	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format, precisionFixed } from 'd3-format';

	import MultiLine from '../../_components/MultiLine.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import Labels from '../../_components/GroupLabels.html.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruit.csv';

	/* --------------------------------------------
	 * Set what is our x key to separate it from the other series
	 */
	const xKey = 'month';
	const yKey = 'value';
	const zKey = 'fruit';

	const xKeyCast = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string'
			? xKeyCast(d[xKey])
			: d[xKey];

		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const formatTickX = timeFormat('%b. %e');
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
	<SeriesLonger
		{data}
		{seriesNames}
		seriesTo={zKey}
		valueTo={yKey}
		let:seriesData
	>
		<LayerCake
			padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			z={zKey}
			yDomain={[0, null]}
			zScale={scaleOrdinal()}
			zRange={seriesColors}
			flatData={flatten(seriesData, 'values')}
			data={seriesData}
		>
			<Svg>
				<AxisX
					gridlines={false}
					ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
					formatTick={formatTickX}
					snapTicks={true}
					tickMarks={true}
				/>
				<AxisY
					ticks={4}
					formatTick={formatTickY}
				/>
				<MultiLine/>
			</Svg>

			<Html>
				<Labels/>
				<SharedTooltip
					formatTitle={formatTickX}
					dataset={data}
				/>
			</Html>
		</LayerCake>
	</SeriesLonger>
</div>
