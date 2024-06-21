<!--
	@component
	Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { geoPath } from 'd3-geo';
	import { raise } from 'layercake';

	const { data, width, height, zGet } = getContext('LayerCake');

	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Number} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here. */
	export let fixedAspectRatio = undefined;

	/** @type {String} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
	export let fill = undefined;

	/** @type {String} [stroke='#333'] - The shape's stroke color. */
	export let stroke = '#333';

	/** @type {Number} [strokeWidth=0.5] - The shape's stroke width. */
	export let strokeWidth = 0.5;

	/** @type {Array} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset. */
	export let features = undefined;

	/* --------------------------------------------
	 * Here's how you would do cross-component hovers
	 */
	const dispatch = createEventDispatcher();

	$: fitSizeRange = fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height];

	$: projectionFn = projection().fitSize(fitSizeRange, $data);

	$: geoPathFn = geoPath(projectionFn);

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			raise(this);
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch('mousemove', { e, props: feature.properties });
			}
		};
	}
</script>

<g class="map-group" on:mouseout={e => dispatch('mouseout')} on:blur={e => dispatch('mouseout')}>
	{#each features || $data.features as feature}
		<path
			class="feature-path"
			fill={fill || $zGet(feature.properties)}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			on:mouseover={e => dispatch('mousemove', { e, props: feature.properties })}
			on:focus={e => dispatch('mousemove', { e, props: feature.properties })}
			on:mousemove={handleMousemove(feature)}
		></path>
	{/each}
</g>

<style>
	/* .feature-path {
		stroke: #333;
		stroke-width: 0.5px;
	} */
	.feature-path:hover {
		stroke: #000;
		stroke-width: 2px;
	}
	/**
	 * Disable the outline on feature click.
	 * Depending on map funtionality and accessiblity issues,
	 * you may not want this rule. Read more:
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
	 * https://github.com/mhkeller/layercake/issues/63
	 */
	.feature-path:focus {
		outline: none;
	}
</style>
