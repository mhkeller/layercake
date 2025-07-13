<!--
	@component
	Adds HTML text labels based features in the data or a custom GeoJSON Feature Collection.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number|undefined} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here.
	 * @property {Function} getLabel - An accessor function to get the field to display.
	 * @property {Function} getCoordinates - An accessor function to get the `[x, y]` coordinate field. Defaults to a GeoJSON feature format.
	 * @property {Array<Object>|undefined} [features] - A list of labels as GeoJSON features. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features.
	 */

	/** @type {Props} */
	let { projection, fixedAspectRatio, getLabel, getCoordinates, features } = $props();

	let fitSizeRange = $derived(fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height]);

	let projectionFn = $derived(projection().fitSize(fitSizeRange, $data));

	let units = $derived(fixedAspectRatio ? '%' : 'px');
</script>

<div class="map-labels" style:aspect-ratio={fixedAspectRatio ? 1 : null}>
	{#each features || $data.features as d}
		{@const coords = projectionFn(getCoordinates(d))}
		<div
			class="map-label"
			style="
			left: {coords[0]}{units};
			top: {coords[1]}{units};
		"
		>
			{getLabel(d)}
		</div>
	{/each}
</div>

<style>
	.map-labels {
		pointer-events: none;
		position: relative;
	}
	.map-label {
		position: absolute;
		text-align: center;
		font-size: 8px;
		color: #333;
		margin-top: -3px; /* To match the SVG labels, it needs a slight tweak */
		transform: translate(-50%, -50%);
	}
</style>
