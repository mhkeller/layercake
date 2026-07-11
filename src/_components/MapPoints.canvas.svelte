<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { scaleCanvas } from 'layercake';

	const { data, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number} [r=3.5] - The point's radius.
	 * @property {string} [fill='yellow'] - The point's fill color.
	 * @property {string} [stroke='#000'] - The point's stroke color.
	 * @property {number} [strokeWidth=1] - The point's stroke width.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features.
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

	onMount(() => {
		function draw() {
			const w = get(width);
			const h = get(height);
			const context = get(ctx);
			if (!w || !h || !context) return;

			const chartData = get(data);
			const projectionFn = projection().fitSize([w, h], chartData);
			const featuresToDraw = features || chartData.features;

			scaleCanvas(context, w, h);
			context.clearRect(0, 0, w, h);

			// To scale the circle by size, set width and height to `$rGet(d.properties)`
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
		}

		const unsubs = [width, height, ctx, data].map(store => store.subscribe(draw));
		return () => unsubs.forEach(unsub => unsub());
	});
</script>
