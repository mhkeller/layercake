<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getLayerCakeContext, getCanvasContext } from 'layercake';
	import { geoPath } from 'd3-geo';

	const k = getLayerCakeContext();
	const canvas = getCanvasContext();

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

	// Layer Cake runs this on every repaint: resize, new data or a prop change
	canvas.draw(ctx => {
		featuresToDraw.forEach(
			/** @param {any} feature */ feature => {
				ctx.beginPath();
				// Set the context here since setting it in `geoPath` is a circular reference
				geoPathFn.context(ctx);
				geoPathFn(feature);

				// Fall back to a neutral fill when the chart has no c dimension
				ctx.fillStyle = fill ?? k.cGet?.(feature.properties) ?? '#ccc';
				ctx.fill();

				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = stroke;
				ctx.stroke();
			}
		);
	});
</script>
