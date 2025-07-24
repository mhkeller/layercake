<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					if (!$ctx) return;

					/**
					 * If you were to have multiple canvas layers
					 * maybe for some artistic layering purposes
					 * put these reset functions in the first layer, not each one
					 * since they should only run once per update
					 */
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);

					/**
					 * Draw our scatterplot
					 */
					$data.forEach((/** @type {any} d */ d) => {
						$ctx.beginPath();
						$ctx.arc($xGet(d), $yGet(d), r, 0, 2 * Math.PI, false);
						$ctx.lineWidth = strokeWidth;
						$ctx.strokeStyle = stroke;
						$ctx.stroke();
						$ctx.fillStyle = fill;
						$ctx.fill();
					});
				});
			}
		});
	});
</script>
