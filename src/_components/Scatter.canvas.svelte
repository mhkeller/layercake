<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {Number} [r=5] - The circle's radius.
	 * @property {String} [fill='#0cf'] - The circle's fill color.
	 * @property {String} [stroke='#000'] - The circle's stroke color.
	 * @property {Number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	run(() => {
		if ($ctx) {
			/* --------------------------------------------
			 * If you were to have multiple canvas layers
			 * maybe for some artistic layering purposes
			 * put these reset functions in the first layer, not each one
			 * since they should only run once per update
			 */
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			/* --------------------------------------------
			 * Draw our scatterplot
			 */
			$data.forEach(d => {
				$ctx.beginPath();
				$ctx.arc($xGet(d), $yGet(d), r, 0, 2 * Math.PI, false);
				$ctx.lineWidth = strokeWidth;
				$ctx.strokeStyle = stroke;
				$ctx.stroke();
				$ctx.fillStyle = fill;
				$ctx.fill();
			});
		}
	});
</script>
