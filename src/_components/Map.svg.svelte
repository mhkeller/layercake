<!--
	@component
	Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { geoPath } from 'd3-geo';
	import { raise } from 'layercake';

	const { data, width, height, zGet } = getContext('LayerCake');

	

	

	

	

	

	
	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {Number|undefined} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here.
	 * @property {String|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set.
	 * @property {String} [stroke] - The shape's stroke color.
	 * @property {Number} [strokeWidth] - The shape's stroke width.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset.
	 */

	/** @type {Props} */
	let {
		projection,
		fixedAspectRatio = undefined,
		fill = undefined,
		stroke = '#333',
		strokeWidth = 0.5,
		features = undefined
	} = $props();

	/* --------------------------------------------
	 * Here's how you would do cross-component hovers
	 */
	const dispatch = createEventDispatcher();

	let fitSizeRange = $derived(fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height]);

	let projectionFn = $derived(projection().fitSize(fitSizeRange, $data));

	let geoPathFn = $derived(geoPath(projectionFn));

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

<g
	class="map-group"
	onmouseout={() => dispatch('mouseout')}
	onblur={() => dispatch('mouseout')}
	role="tooltip"
>
	{#each features || $data.features as feature}
		<!-- svelte-ignore a11y_mouse_events_have_key_events -->
		<path
			class="feature-path"
			fill={fill || $zGet(feature.properties)}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			onmouseover={e => dispatch('mousemove', { e, props: feature.properties })}
			onmousemove={handleMousemove(feature)}
			role="tooltip"
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
	 * Depending on map functionality and accessiblity issues,
	 * you may not want this rule. Read more:
	 * https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
	 * https://github.com/mhkeller/layercake/issues/63
	 */
	.feature-path:focus {
		outline: none;
	}
</style>
