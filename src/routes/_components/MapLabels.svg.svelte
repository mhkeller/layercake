<script>
	import { LayerCake, Svg } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';

	import MapLabels from '../../_components/MapLabels.svg.svelte';

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
		<Svg>
			<MapLabels
				{projection}
				features={usStateLabels.filter(d => !hideList.includes(d.abbr))}
				getCoordinates={d => d.center}
				getLabel={d => d.abbr}
			/>
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
