<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas, getLayerCakeContext } from 'layercake';
	import { geoPath } from 'd3-geo';

	const cake = getLayerCakeContext();

	const canvasCtx = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {string} [stroke='#ccc'] - The shape's stroke color.
	 * @property {number} [strokeWidth=1] - The shape's stroke width.
	 * @property {string|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the c-scale, unless this prop is set.
	 * @property {Array<GeoJSON>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `cake.data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `cake.data.features` if left unset.
	 */

	/** @type {Props} */
	let { projection, stroke = '#ccc', strokeWidth = 1, fill, features } = $props();

	let projectionFn = $derived(projection().fitSize([cake.width, cake.height], cake.data));

	let geoPathFn = $derived(geoPath(projectionFn));

	let featuresToDraw = $derived(features || cake.data.features);

	$effect(() => {
		if (!cake.width || !cake.height || !canvasCtx.ctx) return;

		const context = canvasCtx.ctx;

		scaleCanvas(context, cake.width, cake.height);
		context.clearRect(0, 0, cake.width, cake.height);

		featuresToDraw.forEach(
			/** @param {any} feature */ feature => {
				context.beginPath();
				// Set the context here since setting it in `geoPath` is a circular reference
				geoPathFn.context(context);
				geoPathFn(feature);

				context.fillStyle = fill || cake.cGet(feature.properties);
				context.fill();

				context.lineWidth = strokeWidth;
				context.strokeStyle = stroke;
				context.stroke();
			}
		);
	});
</script>
