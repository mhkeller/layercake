<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import Beeswarm from '../../components/Beeswarm.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/cars-2.csv';

	const xKey = 'Weight_in_lbs';
	const zKey = 'Origin';
	const titleKey = 'Name';

	const r = 4;

	const seriesNames = new Set();
	const seriesColors = ['#ccc', '#fc0', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[zKey]);
		return {
			title: d[titleKey],
			[xKey]: +d[xKey],
			[zKey]: d[zKey]
		};
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

<div class='chart-container'>
	<LayerCake
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={[...seriesNames].sort()}
		zRange={seriesColors}
		data={dataTransformed}
		custom={{ getTitle: d => d.data.title }}
		let:width
	>

		<Svg>
			<Beeswarm
				r={width < 400 ? r / 1.6 : r}
				spacing={1}
			/>
		</Svg>
	</LayerCake>
</div>
