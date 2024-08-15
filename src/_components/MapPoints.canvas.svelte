<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Number} [r=3.5] - The point's radius. */
	export let r = 3.5;

	/** @type {string} [fill='yellow'] - The point's fill color. */
	export let fill = 'yellow';

	/** @type {string} [stroke='#000'] - The point's stroke color. */
	export let stroke = '#000';

	/** @type {Number} [strokeWidth=1] - The point's stroke width. */
	export let strokeWidth = 1;

	/** @type {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features. */
	export let features = undefined;

	$: projectionFn = projection().fitSize([$width, $height], $data);

	$: featuresToDraw = features || $data.features;
	$: {
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
	}
</script>
