<!--
	@component
	Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { geoPath } from 'd3-geo';
	import { raise, getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number|undefined} [fixedAspectRatio] - By default, the map fills to fit the k.width and k.height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here.
	 * @property {string|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the c-scale, unless this prop is set.
	 * @property {string} [stroke='#333'] - The shape's stroke color.
	 * @property {number} [strokeWidth=0.5] - The shape's stroke width.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `k.data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `k.data.features` if left unset.
	 * @property {(e: MouseEvent, props: Object) => void} [onmousemove] - A function that gets called on mousemove events. The first argument is the event, and the second is the properties of the hovered feature.
	 * @property {(e: MouseEvent) => void} [onmouseout] - A function that gets called on mouseout events.
	 */

	/** @type {Props} */
	let {
		projection,
		fixedAspectRatio,
		fill,
		stroke = '#333',
		strokeWidth = 0.5,
		features,
		onmousemove = () => {},
		onmouseout = () => {}
	} = $props();

	let fitSizeRange = $derived(
		fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [k.width, k.height]
	);

	let projectionFn = $derived(projection().fitSize(fitSizeRange, k.data));

	let geoPathFn = $derived(geoPath(projectionFn));

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			// @ts-ignore
			raise(this);
			// Raising the element moves it in the DOM, which fires one stray event
			// at 0,0. Skip that one.
			if (e.layerX !== 0 && e.layerY !== 0) {
				onmousemove(e, feature.properties);
			}
		};
	}
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<g class="map-group" {onmouseout} role="tooltip">
	{#each features || k.data.features as feature}
		<path
			class="feature-path"
			fill={fill ?? k.cGet?.(feature.properties) ?? '#ccc'}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			onmouseover={e => onmousemove(e, feature.properties)}
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
