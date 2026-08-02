<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas, getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	const canvasCtx = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number} [r=3.5] - The point's radius.
	 * @property {string} [fill='yellow'] - The point's fill color.
	 * @property {string} [stroke='#000'] - The point's stroke color.
	 * @property {number} [strokeWidth=1] - The point's stroke width.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will default to those in `cake.data.features`, assuming this field is a list of GeoJSON features.
	 */

	/** @type {Props} */
	let {
		projection,
		r = 3.5,
		fill = 'yellow',
		stroke = '#000',
		strokeWidth = 1,
		features
	} = $props();

	let projectionFn = $derived(projection().fitSize([cake.width, cake.height], cake.data));

	let featuresToDraw = $derived(features || cake.data.features);

	$effect(() => {
		if (!cake.width || !cake.height || !canvasCtx.ctx) return;

		const context = canvasCtx.ctx;

		scaleCanvas(context, cake.width, cake.height);
		context.clearRect(0, 0, cake.width, cake.height);

		// To scale the circle by size, set width and height to `cake.rGet(d.properties)`
		featuresToDraw.forEach(
			/** @param {any} d */ d => {
				context.beginPath();
				const coordinates = projectionFn(d.geometry.coordinates);
				context.arc(coordinates[0], coordinates[1], r, 0, 2 * Math.PI, false);
				context.fillStyle = fill;
				context.fill();
				context.lineWidth = strokeWidth;
				context.strokeStyle = stroke;
				context.stroke();
			}
		);
	});
</script>
