<script>
	/**
		Adds HTML text labels based features in the data or a custom GeoJSON Feature Collection.
		@type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
		@type {Function} getLabel – An accessor function to get the field to display.
		@type {Function} [getCoordinates=d => d.geometry.coordinates] – An accessor function to get the `[x, y]` coordinate field. Defaults to a GeoJSON feature format.
		@type {Array} [features=$data.features] – A list of labels. By default, assumes `$data` is a GeoJSON Feature Collection and uses those features.
	*/
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	export let projection;
	export let getLabel;
	export let getCoordinates;
	export let features = $data.features;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<div class="map-labels">
{#each features as d}
	<div
		class="map-label"
		style="
			left: {projectionFn(getCoordinates(d))[0]}px;
			top: {projectionFn(getCoordinates(d))[1]}px;
		"
	>{getLabel(d)}</div>
{/each}
</div>

<style>
	.map-label {
		position: absolute;
		text-align: center;
		font-size: 10px;
		color: #333;
		margin-top: -3px; /* To match the SVG labels, it needs a slight tweak */
		transform: translate(-50%, -50%);
	}
</style>
