<script>
	import { LayerCake, Svg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapSvg from '../../_components/Map.svg.svelte';
	import MapCanvas from '../../_components/Map.canvas.svelte';
	import MapPointsCanvas from '../../_components/MapPoints.canvas.svelte';
	import MapLabels from '../../_components/MapLabels.html.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';
	import stateLabels from '../../_data/us-states-labels.json';

	const cKey = 'myValue';
	const labelCoordinatesKey = 'center';
	const labelNameKey = 'abbr';

	/** @type {import('geojson').FeatureCollection} */
	// @ts-ignore - topojson feature() can return FeatureCollection
	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	// Create lookups to more easily join our data
	// `dataJoinKey` is the name of the field in the data
	// `mapJoinKey` is the name of the field in the map file
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map();

	stateData.forEach(
		/** @param {any} d */ d => {
			dataLookup.set(d[dataJoinKey], d[cKey]);
		}
	);

	// Exclude some for space reasons
	const labelsToExclude = ['VT', 'MD', 'NJ', 'RI', 'DC', 'DE', 'WV', 'MA', 'CT', 'NH'];
	const labelsToDisplay = stateLabels.filter(
		/** @param {any} d */ d => {
			return !labelsToExclude.includes(d[labelNameKey]);
		}
	);

	// The states too small to carry a label get a dot instead. MapPoints wants
	// GeoJSON-shaped features, so wrap each label's coordinates that way.
	const dotFeatures = stateLabels
		.filter(/** @param {any} d */ d => labelsToExclude.includes(d[labelNameKey]))
		.map(/** @param {any} d */ d => ({ geometry: { coordinates: d[labelCoordinatesKey] } }));

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features
		.map(d => d.properties)
		.filter(d => d !== null && d !== undefined);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		c={(/** @type {any} */ d) => dataLookup.get(d[mapJoinKey])}
		cScale={scaleQuantize()}
		cRange={colors}
		{flatData}
	>
		<Canvas>
			<MapCanvas {projection} fill="#fff" />
			<MapPointsCanvas {projection} features={dotFeatures} r={2.5} fill="#333" stroke="#fff" />
		</Canvas>

		<Svg>
			<MapSvg {projection} features={geojson.features.slice(40, 50)} />
		</Svg>

		<Html pointerEvents={false}>
			<MapLabels
				{projection}
				features={labelsToDisplay}
				getCoordinates={(/** @type {any} */ d) => d[labelCoordinatesKey]}
				getLabel={(/** @type {any} */ d) => d[labelNameKey]}
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
