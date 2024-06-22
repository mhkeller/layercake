<script>
	import { LayerCake, Svg } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	import MapSvg from '../../_components/Map.svg.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';

	const colorKey = 'myValue';
	/* --------------------------------------------
	 * Create lookups to more easily join our data
	 */
	const joinKey = 'name';
	const dataLookup = new Map();

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	stateData.forEach(d => {
		dataLookup.set(d[joinKey], d);
	});

	geojson.features.forEach(d => {
		// This will overwrite any existing keys on d.properties
		// so watch out for any name collision
		Object.assign(d.properties, dataLookup.get(d.properties[joinKey]));
	});

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		data={geojson}
		z={colorKey}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg {projection} />
		</Svg>
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
