<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {string} [stroke='#ccc'] - The shape's stroke color.
	 * @property {number} [strokeWidth=1] - The shape's stroke width.
	 * @property {string|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set.
	 * @property {Array<GeoJSON>|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset.
	 */

	/** @type {Props} */
	let { projection, stroke = '#ccc', strokeWidth = 1, fill, features } = $props();

	onMount(() => {
		function draw() {
			const w = get(width);
			const h = get(height);
			const context = get(ctx);
			if (!w || !h || !context) return;

			const chartData = get(data);
			const projectionFn = projection().fitSize([w, h], chartData);
			const path = geoPath(projectionFn);
			const featuresToDraw = features || chartData.features;

			scaleCanvas(context, w, h);
			context.clearRect(0, 0, w, h);

			featuresToDraw.forEach(
				/** @param {any} feature */ feature => {
					context.beginPath();
					// Set the context here since setting it in `geoPath` is a circular reference
					path.context(context);
					path(feature);

					context.fillStyle = fill || get(zGet)(feature.properties);
					context.fill();

					context.lineWidth = strokeWidth;
					context.strokeStyle = stroke;
					context.stroke();
				}
			);
		}

		const unsubs = [width, height, ctx, data].map(store => store.subscribe(draw));
		return () => unsubs.forEach(unsub => unsub());
	});
</script>
