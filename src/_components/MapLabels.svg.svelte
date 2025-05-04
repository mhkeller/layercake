<!--
	@component
	Adds SVG text labels based features in the data or a custom GeoJSON Feature Collection.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	

	

	

	

	
	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {Function} getLabel - An accessor function to get the field to display.
	 * @property {Number|undefined} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here.
	 * @property {Function} getCoordinates - An accessor function to get the `[x, y]` coordinate field. Defaults to a GeoJSON feature format.
	 * @property {Array<Object>|undefined} [features] - A list of labels as GeoJSON features. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features.
	 */

	/** @type {Props} */
	let {
		projection,
		getLabel,
		fixedAspectRatio = undefined,
		getCoordinates,
		features = undefined
	} = $props();

	let fitSizeRange = $derived(fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height]);

	let projectionFn = $derived(projection().fitSize(fitSizeRange, $data));
</script>

<g class="map-labels">
	{#each features || $data.features as d}
		{@const coords = projectionFn(getCoordinates(d))}
		<text class="map-label" x={coords[0]} y={coords[1]}>{getLabel(d)}</text>
	{/each}
</g>

<style>
	.map-labels {
		pointer-events: none;
	}
	.map-label {
		color: #333;
		/**
		 * If you render this in an ScaledSvg layout component, you'll
		 * want to make this like 1px bc it's actually being zoomed by about 10x
		 */
		font-size: 8px;
		text-anchor: middle;
	}
</style>
