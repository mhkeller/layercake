<!--
	@component
	Adds SVG text labels based features in the data or a custom GeoJSON Feature Collection.
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

	/** @type {Array} [features=$data.features] – A list of labels. By default, assumes `$data` is a GeoJSON Feature Collection and uses those features. */
	export let features = $data.features;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<g class="map-labels">
{#each features as d}
	<text
		class="map-label"
		x="{projectionFn(getCoordinates(d))[0]}"
		y="{projectionFn(getCoordinates(d))[1]}"
	>{getLabel(d)}</text>
{/each}
</g>

<style>
	.map-label {
		color: #333;
		font-size: 10px;
		text-anchor: middle;
	}
</style>
