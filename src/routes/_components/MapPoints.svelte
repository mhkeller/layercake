<script>
	import { LayerCake, Svg } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa, geoCentroid } from 'd3-geo';

	import MapPoints from '../../components/MapPoints.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../data/us-states.topojson.json';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	const features = geojson.features.map(d => {
		return {
			properties: d.properties,
			geometry: {
				coordinates: geoCentroid(d)
			}
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

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		data={geojson}
	>
		<Svg>
			<MapPoints
				{projection}
				{features}
			/>
		</Svg>
	</LayerCake>
</div>
