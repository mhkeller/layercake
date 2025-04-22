<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import { format } from 'd3-format';

	import MapSvg from '../../_components/Map.svg.svelte';
	import Tooltip from '../../_components/Tooltip.html.svelte';

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

	const geojson = feature(usStates, usStates.objects.states);
	const projection = geoIdentity;

	stateData.forEach(d => {
		dataLookup.set(d[dataJoinKey], d);
	});

	let evt = $state();
	let hideTooltip = $state(true);

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	const addCommas = format(',');
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])[colorKey]}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg
				{projection}
				on:mousemove={event => (evt = hideTooltip = event)}
				on:mouseout={() => (hideTooltip = true)}
			/>
		</Svg>

		<Html pointerEvents={false}>
			{#if hideTooltip !== true}
				<Tooltip {evt}>
					{#snippet children({ detail })}
						<!-- For the tooltip, do another data join because the hover event only has the data from the geography data -->
						{@const tooltipData = { ...detail.props, ...dataLookup.get(detail.props[mapJoinKey]) }}
						{#each Object.entries(tooltipData) as [key, value]}
							{@const keyCapitalized = key.replace(/^\w/, d => d.toUpperCase())}
							<div class="row">
								<span>{keyCapitalized}:</span>
								{typeof value === 'number' ? addCommas(value) : value}
							</div>
						{/each}
					{/snippet}
				</Tooltip>
			{/if}
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
