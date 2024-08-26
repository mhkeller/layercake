<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {String} [stroke='#ccc'] - The shape's stroke color. */
	export let stroke = '#ccc';

	/** @type {number} [strokeWidth=1] - The shape's stroke width. */
	export let strokeWidth = 1;

	/** @type {String|undefined} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
	export let fill = undefined;

	/** @type {Array|undefined} [features] - A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset. */
	export let features = undefined;

	$: projectionFn = projection().fitSize([$width, $height], $data);

	$: geoPathFn = geoPath(projectionFn);

	$: featuresToDraw = features || $data.features;

	$: {
		if ($ctx && geoPath) {
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			featuresToDraw.forEach(feature => {
				$ctx.beginPath();
				// Set the context here since setting it in `$: geoPath` is a circular reference
				geoPathFn.context($ctx);
				geoPathFn(feature);

				$ctx.fillStyle = fill || $zGet(feature.properties);
				$ctx.fill();

				$ctx.lineWidth = strokeWidth;
				$ctx.strokeStyle = stroke;
				$ctx.stroke();
			});
		}
	}
</script>
