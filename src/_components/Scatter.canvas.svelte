<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas, getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	const canvasCtx = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	$effect(() => {
		if (!cake.width || !cake.height || !canvasCtx.ctx) return;

		const context = canvasCtx.ctx;

		/**
		 * If you were to have multiple canvas layers
		 * maybe for some artistic layering purposes
		 * put these reset functions in the first layer, not each one
		 * since they should only run once per update
		 */
		scaleCanvas(context, cake.width, cake.height);
		context.clearRect(0, 0, cake.width, cake.height);

		/**
		 * Draw our scatterplot
		 */
		cake.data.forEach((/** @type {any} d */ d) => {
			context.beginPath();
			context.arc(cake.xGet(d), cake.yGet(d), r, 0, 2 * Math.PI, false);
			context.lineWidth = strokeWidth;
			context.strokeStyle = stroke;
			context.stroke();
			context.fillStyle = fill;
			context.fill();
		});
	});
</script>
