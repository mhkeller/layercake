<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas, getLayerCakeContext } from 'layercake';
	import { geoPath } from 'd3-geo';

	const k = getLayerCakeContext();

	const canvasCtx = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {string} [stroke='#ccc'] - The shape's stroke color.
	 * @property {number} [strokeWidth=1] - The shape's stroke width.
	 * @property {string|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the c-scale, unless this prop is set.
	 * @property {Array<GeoJSON>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `k.data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `k.data.features` if left unset.
	 */

	/** @type {Props} */
	let { projection, stroke = '#ccc', strokeWidth = 1, fill, features } = $props();

	let projectionFn = $derived(projection().fitSize([k.width, k.height], k.data));

	let geoPathFn = $derived(geoPath(projectionFn));

	let featuresToDraw = $derived(features || k.data.features);

	$effect(() => {
		if (!k.width || !k.height || !canvasCtx.ctx) return;

		const context = canvasCtx.ctx;

		scaleCanvas(context, k.width, k.height);
		context.clearRect(0, 0, k.width, k.height);

		featuresToDraw.forEach(
			/** @param {any} feature */ feature => {
				context.beginPath();
				// Set the context here since setting it in `geoPath` is a circular reference
				geoPathFn.context(context);
				geoPathFn(feature);

				// Fall back to a neutral fill when the chart has no c dimension
				context.fillStyle = fill ?? k.cGet?.(feature.properties) ?? '#ccc';
				context.fill();

				context.lineWidth = strokeWidth;
				context.strokeStyle = stroke;
				context.stroke();
			}
		);
	});
</script>
