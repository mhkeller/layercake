<!--
	@component
	Adds HTML text labels based on features in the data or a custom GeoJSON Feature Collection.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	/** @type {import('layercake').LayerCakeContext<any, { features: Array<any> }>} */
	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {(d: any) => string} getLabel - Returns the label text for a feature.
	 * @property {(d: any) => [number, number]} getCoordinates - Returns the `[x, y]` coordinate pair to project for a feature, e.g. `d => d.geometry.coordinates`.
	 * @property {number|undefined} [fixedAspectRatio] - By default, the map fills to fit the k.width and k.height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here.
	 * @property {Array<Object>|undefined} [features] - A list of labels as GeoJSON features. If unset, the plotted features will default to those in `k.data.features`, assuming this field is a list of GeoJSON features.
	 */

	/** @type {Props} */
	let { projection, getLabel, getCoordinates, fixedAspectRatio, features } = $props();

	let fitSizeRange = $derived(
		fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [k.width, k.height]
	);

	let projectionFn = $derived(projection().fitSize(fitSizeRange, k.data));

	// With a fixed aspect ratio the projection fits a 100 by 100 box, so positions are percentages
	let units = $derived(fixedAspectRatio ? '%' : 'px');
</script>

<!-- The box is square on purpose: both percentages then measure against the width -->
<div class="map-labels" style:aspect-ratio={fixedAspectRatio ? 1 : null}>
	{#each features || k.data.features as d}
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
		margin-top: -3px; /* Lines up with the SVG labels' baseline */
		transform: translate(-50%, -50%);
	}
</style>
