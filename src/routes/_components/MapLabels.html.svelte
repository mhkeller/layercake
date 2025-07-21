<script>
	import { LayerCake, Html /*, Svg */ } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';

	import MapLabelsHtml from '../../_components/MapLabels.html.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/us-states.topojson.json';
	import usStateLabels from '../../_data/us-states-labels.json';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	const hideList = ['CT', 'DC', 'DE', 'MA', 'MD', 'NH', 'NJ', 'RI', 'WV'];
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<!-- <Svg>
			<MapSvg
				fill='#fff'
				{projection}
			/>
		</Svg> -->
		<Html>
			<MapLabelsHtml
				{projection}
				features={usStateLabels.filter(d => !hideList.includes(d.abbr))}
				getLabel={d => d.abbr}
				getCoordinates={d => d.center}
			/>
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
