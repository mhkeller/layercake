<!--
	@component
	Adds HTML text labels based features in the data or a custom GeoJSON Feature Collection.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/** @type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Function} getLabel – An accessor function to get the field to display. */
	export let getLabel;

	/** @type {Function} [getCoordinates=d => d.geometry.coordinates] – An accessor function to get the `[x, y]` coordinate field. Defaults to a GeoJSON feature format. */
	export let getCoordinates;

	/** @type {Array} [features] – A list of labels as GeoJSON features. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features. */
	export let features = undefined;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<div class="map-labels">
{#each (features || $data.features) as d}
	{@const coords = projectionFn(getCoordinates(d))}
	<div
		class="map-label"
		style="
			left: {coords[0]}px;
			top: {coords[1]}px;
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
