<script>
	import { LayerCake, Svg, flatten } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse } from 'd3-time-format';

	import AreaStacked from '../../components/AreaStacked.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/fruit.csv';

	const xKey = 'month';
	const yKey = [0, 1];
	const zKey = 'key';

	const parseDate = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	/* --------------------------------------------
	 * Create a stacked data structure
	 */
	const stackData = stack()
		.keys(seriesNames);

	const series = stackData(data);
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
	<LayerCake
		x={d => d.data[xKey]}
		y={yKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(series)}
		data={series}
	>
		<Svg>
			<AreaStacked/>
		</Svg>
	</LayerCake>
</div>
