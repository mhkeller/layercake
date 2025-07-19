<!--
	@component
	Generates a canvas map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
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

	let projectionFn = $derived(projection().fitSize([$width, $height], $data));

	let geoPathFn = $derived(geoPath(projectionFn));

	let featuresToDraw = $derived(features || $data.features);

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					if (!$ctx) return;
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);

					featuresToDraw.forEach(
						/** @param {any} feature */ feature => {
							$ctx.beginPath();
							// Set the context here since setting it in `$: geoPath` is a circular reference
							geoPathFn.context($ctx);
							geoPathFn(feature);

							$ctx.fillStyle = fill || $zGet(feature.properties);
							$ctx.fill();

							$ctx.lineWidth = strokeWidth;
							$ctx.strokeStyle = stroke;
							$ctx.stroke();
						}
					);
				});
			}
		});
	});
</script>
