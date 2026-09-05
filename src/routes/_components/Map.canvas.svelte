<script>
	import { LayerCake, Canvas } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapCanvas from '../../_components/Map.canvas.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/us-states.topojson.json';

	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.collection)
	);
	const projection = geoAlbersUsa;
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<Canvas>
			<MapCanvas {projection} fill="#fff" />
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
