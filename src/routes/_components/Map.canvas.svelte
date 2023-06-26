<script>
	import { LayerCake, Canvas } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';

	// For a map example with a tooltip, check out https://layercake.graphics/example/MapSvg

	import MapCanvas from '../../_components/Map.canvas.svelte';

	// This example loads json data as json using @rollup/plugin-json
	import usStates from '../../_data/us-states.topojson.json';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;
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
		padding={{ top: 10 }}
		data={geojson}
	>
		<Canvas>
			<MapCanvas
				{projection}
				fill="#fff"
			/>
		</Canvas>
	</LayerCake>
</div>
