<script>
	import { LayerCake, ScaledSvg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	import MapSvg from '../../_components/Map.svg.svelte';
	import MapCanvas from '../../_components/Map.canvas.svelte';
	import MapPointsCanvas from '../../_components/MapPoints.canvas.svelte';
	import MapLabels from '../../_components/MapLabels.html.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';
	import stateLabels from '../../_data/us-states-labels.json';

	const cKey = 'myValue';
	const labelCoordinatesKey = 'center';
	const labelNameKey = 'abbr';

	// The map file is topojson, so unpack it into GeoJSON features
	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.collection)
	);
	const projection = geoAlbersUsa;

	// Join the data rows to the map features by name
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map(stateData.map(d => [d[dataJoinKey], d[cKey]]));

	// The states too small to carry a label get a dot instead
	const labelsToExclude = ['VT', 'MD', 'NJ', 'RI', 'DC', 'DE', 'WV', 'MA', 'CT', 'NH'];
	const labelsToDisplay = stateLabels.filter(d => !labelsToExclude.includes(d[labelNameKey]));

	// MapPoints wants GeoJSON-shaped features, so wrap each dot's coordinates that way
	const dotFeatures = stateLabels
		.filter(d => labelsToExclude.includes(d[labelNameKey]))
		.map(d => ({ geometry: { coordinates: d[labelCoordinatesKey] } }));

	// A flat list of the feature properties, so LayerCake can measure the color scale's extent
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	// The server can't measure the container, so the map gets a fixed aspect ratio instead
	const aspectRatio = 2.63;
</script>

<div class="map-container" style="aspect-ratio:{aspectRatio};">
	<LayerCake
		ssr
		position="absolute"
		data={geojson}
		c={d => dataLookup.get(d[mapJoinKey])}
		cScale={scaleQuantize()}
		cRange={colors}
		{flatData}
	>
		<!-- Two components on one canvas: the layout paints them in order, dots on top -->
		<Canvas>
			<MapCanvas {projection} fill="#fff" />
			<MapPointsCanvas {projection} features={dotFeatures} r={2.5} fill="#333" stroke="#fff" />
		</Canvas>

		<!-- The canvas only draws in the browser. The states and labels below render on the server too. -->
		<ScaledSvg fixedAspectRatio={aspectRatio}>
			<MapSvg
				fixedAspectRatio={aspectRatio}
				{projection}
				features={geojson.features.slice(40, 50)}
			/>
		</ScaledSvg>

		<Html pointerEvents={false}>
			<MapLabels
				fixedAspectRatio={aspectRatio}
				{projection}
				features={labelsToDisplay}
				getCoordinates={d => d[labelCoordinatesKey]}
				getLabel={d => d[labelNameKey]}
			/>
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width. Its height comes from the aspect ratio set inline. */
	.map-container {
		position: relative;
		width: 100%;
	}
</style>
