<script>
	import { LayerCake, Svg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapSvg from '../../_components/Map.svg.svelte';
	import MapCanvas from '../../_components/Map.canvas.svelte';
	import MapLabels from '../../_components/MapLabels.html.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';
	import stateLabels from '../../_data/us-states-labels.json';

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

	stateData.forEach(d => {
		dataLookup.set(d[dataJoinKey], d[colorKey]);
	});

	// Exclude some for space reasons
	const labelsToExclude = ['VT', 'MD', 'NJ', 'RI', 'DC', 'DE', 'WV', 'MA', 'CT', 'NH'];
	const labelsToDisplay = stateLabels.filter(d => {
		return !labelsToExclude.includes(d[labelNameKey]);
	});

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
		height: 250px;
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

		<Html
			pointerEvents={false}
		>
			<MapLabels
				{projection}
				features={labelsToDisplay}
				getCoordinates={d => d[labelCoordinatesKey]}
				getLabel={d => d[labelNameKey]}
			/>
		</Html>
	</LayerCake>
</div>
