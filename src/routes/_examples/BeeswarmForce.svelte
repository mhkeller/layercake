<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';

	import Key from '../../_components/Key.html.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import Beeswarm from '../../_components/BeeswarmForce.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/us-senate.csv';

	const xKey = 'date_of_birth';
	const zKey = 'gender';
	const titleKey = 'name';

	const r = 6;

	const seriesColors = ['#fc0', '#000'];

	const dataTransformed = data.map(d => {
		return {
			[titleKey]: d[titleKey],
			[zKey]: d[zKey],
			[xKey]: +d[xKey].split('-')[0]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 15 }}
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zRange={seriesColors}
		zDomainSort={true}
		data={dataTransformed}
	>
		<Svg>
			<AxisX />
			<Beeswarm
				{r}
				strokeWidth={1}
				xStrength={0.95}
				yStrength={0.075}
				getTitle={d => d[titleKey]}
			/>
		</Svg>

		<Html pointerEvents={false}>
			<Key shape="circle" />
		</Html>
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
