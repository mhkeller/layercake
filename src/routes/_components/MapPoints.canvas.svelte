<script>
	import { LayerCake, Canvas } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa, geoCentroid } from 'd3-geo';

	import MapPointsCanvas from '../../_components/MapPoints.canvas.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/us-states.topojson.json';

	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.collection)
	);
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

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<Canvas>
			<MapPointsCanvas {projection} {features} />
		</Canvas>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
