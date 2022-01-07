<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/** @type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Array} [features=$data.features] – A list of GeoJSON features to plot. By default, assumes `$data` is a GeoJSON Feature Collection and uses those features. */
	export let features = $data.features;

	/** @type {Number} [r=3.5] – The point's radius. */
	export let r = 3.5;

	/** @type {String} [fill='yellow'] – The point's fill color. */
	export let fill = 'yellow';

	/** @type {String} [stroke='#000'] – The point's stroke color. */
	export let stroke = '#000';

	/** @type {Number} [strokeWidth=1] – The point's stroke width, in pixels. */
	export let strokeWidth = 1;

	/** @type {Number} [opacity=1] – The point's opacity. */
	export let opacity = 1;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<div class="points">
<!-- To scale the circle by size, set width and height to `$rGet(d.properties)` -->
{#each features as d}
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
	>
	</div>
{/each}
</div>

<style>
	.point {
		position: absolute;
		border-radius: 50%;
		border-style: solid;
	}
</style>
