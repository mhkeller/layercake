<script>
	import { LayerCake, Svg } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	import MapSvg from '../../_components/Map.svg.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';

	const cKey = 'myValue';
	// Join the data rows to the map features by name
	const joinKey = 'name';
	const dataLookup = new Map(stateData.map(d => [d[joinKey], d]));

	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.collection)
	);
	const projection = geoAlbersUsa;

	geojson.features.forEach(d => {
		// This copies the row's fields onto d.properties. A field with the same
		// name as a map property silently replaces it.
		Object.assign(d.properties, dataLookup.get(d.properties[joinKey]));
	});

	// A flat list of the feature properties, so LayerCake can measure the color scale's extent
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		data={geojson}
		c={cKey}
		cScale={scaleQuantize()}
		cRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg {projection} />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
