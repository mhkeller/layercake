<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapSvg from '../../_components/Map.svg.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/states-albers-10m.json';
	import stateData from '../../_data/us-states-data.json';

	const colorKey = 'myValue';

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

	const geojson = feature(usStates, usStates.objects.states);
	const aspectRatio = 2.63;
	const projection = geoIdentity;

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
		The height is being set inline with `padding-bottom` using the aspect ratio trick below.
	*/
	.map-container {
		position: relative;
		width: 100%;
	}
</style>

<div class="map-container" style="padding-bottom:{100 / aspectRatio}%">
	<LayerCake
		ssr
		position='absolute'
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<ScaledSvg
			fixedAspectRatio={aspectRatio}
		>
			<MapSvg
				fixedAspectRatio={aspectRatio}
				{projection}
			/>
		</ScaledSvg>
	</LayerCake>
</div>
