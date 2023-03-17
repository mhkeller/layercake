<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import Beeswarm from '../../_components/BeeswarmForce.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/us-senate.csv';

	const xKey = 'date_of_birth';
	const zKey = 'gender';
	const titleKey = 'name';

	const r = 6;

	const seriesNames = new Set();
	const seriesColors = ['#fc0', '#000'];

	const dataTransformed = data.map(d => {
		seriesNames.add(d[zKey]);

		return {
			[titleKey]: d[titleKey],
			[zKey]: d[zKey],
			[xKey]: +d[xKey].split('-')[0]
		}
	})
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

<div class='chart-container'>
	<LayerCake
		padding={{ left: 10, bottom: 15 }}
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={Array.from(seriesNames)}
		zRange={seriesColors}
		data={dataTransformed}
		let:width
	>

		<Svg>
			<Beeswarm
				r={width < 400 ? r / 1.25 : r}
				strokeWidth={1}
				xStrength={0.95}
				yStrength={0.075}
				getTitle={d => d[titleKey]}
			/>
		</Svg>
	</LayerCake>
</div>
