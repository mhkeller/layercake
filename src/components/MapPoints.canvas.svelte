<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/** @type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Array} [features=$data.features] – A list of GeoJSON features to plot. By default, assumes `$data` is a GeoJSON Feature Collection and uses those features. */
	export let features = $data.features;

	/** @type {Number} [r=3.5] – The point's radius. */
	export let r = 3.5;

	/** @type {String} [fill='yellow'] – The point's fill color. */
	export let fill = 'yellow';

	/** @type {String} [stroke='#000'] – The point's stroke color. */
	export let stroke = '#000';

	/** @type {Number} [strokeWidth=1] – The point's stroke width. */
	export let strokeWidth = 1;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);

	$: {
		if ($ctx) {
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			// To scale the circle by size, set width and height to `$rGet(d.properties)`
			features.forEach(d => {
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
