<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {Number} [r] - The point's radius.
	 * @property {String} [fill] - The point's fill color.
	 * @property {String} [stroke] - The point's stroke color.
	 * @property {Number} [strokeWidth] - The point's stroke width, in pixels.
	 * @property {Number} [opacity] - The point's opacity.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features.
	 */

	/** @type {Props} */
	let {
		projection,
		r = 3.5,
		fill = 'yellow',
		stroke = '#000',
		strokeWidth = 1,
		opacity = 1,
		features = undefined
	} = $props();

	let projectionFn = $derived(projection().fitSize([$width, $height], $data));
</script>

<div class="points">
	<!-- To scale the circle by size, set width and height to `$rGet(d.properties)` -->
	{#each features || $data.features as d}
		<div
			class="point"
			style="
			top: {projectionFn(d.geometry.coordinates)[1]}px;
			left: {projectionFn(d.geometry.coordinates)[0]}px;
			width: {r * 2}px;
			height: {r * 2}px;
			border-width: {strokeWidth}px;
			border-color: {stroke};
			background-color: {fill};
			opacity: {opacity};
		"
		></div>
	{/each}
</div>

<style>
	.point {
		position: absolute;
		border-radius: 50%;
		border-style: solid;
	}
</style>
