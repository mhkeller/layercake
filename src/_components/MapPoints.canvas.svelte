<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
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

	let projectionFn = $derived(projection().fitSize([$width, $height], $data));

	let featuresToDraw = $derived(features || $data.features);
	run(() => {
		if ($ctx) {
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			// To scale the circle by size, set width and height to `$rGet(d.properties)`
			featuresToDraw.forEach(d => {
				$ctx.beginPath();
				const coordinates = projectionFn(d.geometry.coordinates);
				$ctx.arc(coordinates[0], coordinates[1], r, 0, 2 * Math.PI, false);
				$ctx.fillStyle = fill;
				$ctx.fill();
				$ctx.lineWidth = strokeWidth;
				$ctx.strokeStyle = stroke;
				$ctx.stroke();
			});
		}
	});
</script>
