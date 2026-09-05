<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import { format } from 'd3-format';

	import MapSvg from '../../_components/Map.svg.svelte';
	import Tooltip from '../../_components/Tooltip.html.svelte';

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

	/** @type {MouseEvent | null} */
	let tooltipEvent = $state(null);
	/** @type {Record<string, any> | null} */
	let tooltipFeature = $state(null);

	// A flat list of the feature properties, so LayerCake can measure the color scale's extent
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	const addCommas = format(',');
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20 }}
		data={geojson}
		c={cKey}
		cScale={scaleQuantize()}
		cRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg
				{projection}
				onmousemove={(event, feature) => {
					tooltipFeature = feature;
					tooltipEvent = event;
				}}
				onmouseout={() => {
					tooltipFeature = null;
					tooltipEvent = null;
				}}
			/>
		</Svg>

		<Html pointerEvents={false}>
			{#if tooltipFeature !== null && tooltipEvent !== null}
				<Tooltip event={tooltipEvent}>
					{#each Object.entries(tooltipFeature) as [key, value]}
						<div class="row">
							<span>{key}:</span>
							{typeof value === 'number' ? addCommas(value) : value}
						</div>
					{/each}
				</Tooltip>
			{/if}
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
