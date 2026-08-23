<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getLayerCakeContext, getCanvasContext } from 'layercake';

	const k = getLayerCakeContext();
	const canvas = getCanvasContext();

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number} [r=3.5] - The point's radius.
	 * @property {string} [fill='yellow'] - The point's fill color.
	 * @property {string} [stroke='#000'] - The point's stroke color.
	 * @property {number} [strokeWidth=1] - The point's stroke width.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will default to those in `k.data.features`, assuming this field is a list of GeoJSON features.
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

	let projectionFn = $derived(projection().fitSize([k.width, k.height], k.data));

	let featuresToDraw = $derived(features || k.data.features);

	// Layer Cake runs this on every repaint: resize, new data or a prop change
	canvas.draw(ctx => {
		// To scale the circle by size, set width and height to `k.rGet(d.properties)`
		featuresToDraw.forEach(
			/** @param {any} d */ d => {
				ctx.beginPath();
				const coordinates = projectionFn(d.geometry.coordinates);
				ctx.arc(coordinates[0], coordinates[1], r, 0, 2 * Math.PI, false);
				ctx.fillStyle = fill;
				ctx.fill();
				ctx.lineWidth = strokeWidth;
				ctx.strokeStyle = stroke;
				ctx.stroke();
			}
		);
	});
</script>
