<script>
	import { LayerCake, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';

	import MapLabelsHtml from '../../_components/MapLabels.html.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/us-states.topojson.json';
	import usStateLabels from '../../_data/us-states-labels.json';

	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.collection)
	);
	const projection = geoAlbersUsa;

	const hideList = ['CT', 'DC', 'DE', 'MA', 'MD', 'NH', 'NJ', 'RI', 'WV'];
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<Html>
			<MapLabelsHtml
				{projection}
				features={usStateLabels.filter(d => !hideList.includes(d.abbr))}
				getLabel={d => d.abbr}
				getCoordinates={d => d.center}
			/>
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
