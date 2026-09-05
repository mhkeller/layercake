<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import { format } from 'd3-format';

	import MapSvg from '../../_components/Map.svg.svelte';
	import Tooltip from '../../_components/Tooltip.html.svelte';

	// The JSON file is imported as data
	import usStates from '../../_data/states-albers-10m.json';
	import stateData from '../../_data/us-states-data.json';

	const cKey = 'myValue';

	// The map file is topojson, so unpack it into GeoJSON features. The shapes are
	// already projected, which is why the projection below is the identity.
	const geojson = /** @type {import('geojson').FeatureCollection<any, Record<string, any>>} */ (
		feature(usStates, usStates.objects.states)
	);
	const projection = geoIdentity;

	// Join the data rows to the map features by name
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map(stateData.map(d => [d[dataJoinKey], d]));

	/** @type {MouseEvent|null} */
	let tooltipEvent = $state(null);
	/** @type {Record<string, any>|null} */
	let tooltipFeature = $state(null);

	// A flat list of the feature properties, so LayerCake can measure the color scale's extent
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	const addCommas = format(',');
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		c={d => dataLookup.get(d[mapJoinKey])?.[cKey]}
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
					<!-- The hover event only carries the map feature, so look up the matching data row again for the tooltip -->
					{@const tooltipData = {
						...tooltipFeature,
						...dataLookup.get(tooltipFeature[mapJoinKey])
					}}
					{#each Object.entries(tooltipData) as [key, value]}
						{@const keyCapitalized = key.replace(/^\w/, d => d.toUpperCase())}
						<div class="row">
							<span>{keyCapitalized}:</span>
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
