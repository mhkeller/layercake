<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { getLayerCakeContext } from 'layercake';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const c = getLayerCakeContext();

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {string} [stroke='#ccc'] - The shape's stroke color.
	 * @property {number} [strokeWidth=1] - The shape's stroke width.
	 * @property {string|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set.
	 * @property {Array<GeoJSON>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `c.data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `c.data.features` if left unset.
	 */

	/** @type {Props} */
	let { projection, stroke = '#ccc', strokeWidth = 1, fill, features } = $props();

	let projectionFn = $derived(projection().fitSize([c.width, c.height], c.data));

	let geoPathFn = $derived(geoPath(projectionFn));

	let featuresToDraw = $derived(features || c.data.features);

	$effect(() => {
		if (!c.width || !c.height || !$ctx) return;

		// Assign to a local variable: setting properties on `$ctx` directly
		// would re-notify the store and re-trigger this effect
		const context = $ctx;
		const zGetFn = c.zGet;

		scaleCanvas(context, c.width, c.height);
		context.clearRect(0, 0, c.width, c.height);

		featuresToDraw.forEach(
			/** @param {any} feature */ feature => {
				context.beginPath();
				// Set the context here since setting it in `geoPath` is a circular reference
				geoPathFn.context(context);
				geoPathFn(feature);

				context.fillStyle = fill || zGetFn(feature.properties);
				context.fill();

				context.lineWidth = strokeWidth;
				context.strokeStyle = stroke;
				context.stroke();
			}
		);
	});
</script>
