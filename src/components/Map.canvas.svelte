<script>
	/**
		Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
		@type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
		@type {GeoJsonFeatureCollection} [features=$data.features] – A GeoJSON feature collection that has an array of features on its `features` key. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data`.
		@type {String} [stroke='#ccc'] – The shape's stroke color.
		@type {Number} [strokeWidth=1] – The shape's stroke width.
		@type {String} [fill='#fff'] – The shape's fill color.
	*/
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';
	import { geoPath } from 'd3-geo';

	const { data, width, height, zGet } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	export let projection;
	export let stroke = '#ccc';
	export let strokeWidth = 1;
	export let fill = '#fff';
	export let features = $data;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);

	$: geoPathFn = geoPath(projectionFn);

	$: {
		if ($ctx && geoPath) {
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			features.features.forEach(feature => {
				$ctx.beginPath();
				// Set the context here since setting it in `$: geoPath` is a circular reference
				geoPathFn.context($ctx);
				geoPathFn(feature);

				$ctx.fillStyle = fill;
				// $ctx.fillStyle = $zGet(feature.properties); // Use this if making a choropleth
				$ctx.fill();

				$ctx.lineWidth = strokeWidth;
				$ctx.strokeStyle = stroke;
				$ctx.stroke();
			});
		}
	}
</script>
