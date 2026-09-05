<!--
	@component
	Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { geoPath } from 'd3-geo';
	import { raise, getLayerCakeContext } from 'layercake';

	/** @type {import('layercake').LayerCakeContext<any, { features: Array<any> }>} */
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

	/** @param {any} feature */
	function handleMousemove(feature) {
		/** @this {Element} @param {MouseEvent} e */
		return function handleMousemoveFn(e) {
			// Move the hovered shape to the end of its group so its stroke draws over its neighbours
			raise(this);
			onmousemove(e, feature.properties);
		};
	}
</script>

<!-- Hovering a feature reports its properties to the parent. There is no keyboard path yet. -->
<!-- svelte-ignore a11y_mouse_events_have_key_events, a11y_no_static_element_interactions -->
<g class="map-group" {onmouseout}>
	{#each features || k.data.features as feature}
		<path
			class="feature-path"
			fill={fill ?? k.cGet?.(feature.properties) ?? '#ccc'}
			{stroke}
			stroke-width={strokeWidth}
			d={geoPathFn(feature)}
			onmouseover={e => onmousemove(e, feature.properties)}
			onmousemove={handleMousemove(feature)}
		></path>
	{/each}
</g>

<style>
	.feature-path:hover {
		stroke: #000;
		stroke-width: 2px;
	}
	/* Clicking a feature would otherwise draw a focus ring around it */
	.feature-path:focus {
		outline: none;
	}
</style>
