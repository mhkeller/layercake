<script>
	import { LayerCake, Svg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapSvg from '../../components/Map.svg.svelte';
	import MapCanvas from '../../components/Map.canvas.svelte';
	import MapLabels from '../../components/MapLabels.html.svelte';
	// import MapLabels from '../../components/MapLabels.html.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../data/us-states.topojson.json';
	import stateData from '../../data/us-states-data.json';
	import stateLabels from '../../data/us-states-labels.json';

	const colorKey = 'myValue';
	const labelCoordinatesKey = 'center';
	const labelNameKey = 'abbr';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	/* --------------------------------------------
	* Create lookups to more easily join our data
	* `dataJoinKey` is the name of the field in the data
	* `mapJoinKey` is the name of the field in the map file
	*/
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map();
	const labelLookup = new Map();

	stateData.forEach(d => {
		dataLookup.set(d[dataJoinKey], d[colorKey]);
	});

	// stateLabels.forEach(d => {
	// 	labelLookup.set(d[dataJoinKey], d);
	// });

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
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
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Canvas>
			<MapCanvas
				{projection}
				fill='#fff'
			/>
		</Canvas>

		<Svg>
			<MapSvg
				{projection}
				features={geojson.features.slice(40, 50)}
			/>
		</Svg>

		<!-- Work in progress -->
		<!-- <Html
			pointerEvents={false}
		>
			<MapLabels
				{projection}
				features={[...geojson.features.slice(0, 50), geojson.features[0]]}
				getCoordinates={feature => feature.properties[labelCoordinatesKey]}
				getName={feature => feature.properties[labelNameKey]}
			/>
		</Html> -->
	</LayerCake>
</div>
