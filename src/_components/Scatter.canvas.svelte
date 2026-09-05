<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas, getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

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
		if (!k.width || !k.height || !canvasCtx.ctx) return;

		const context = canvasCtx.ctx;

		/**
		 * If you stack several canvas layers, put these two reset calls in the
		 * first layer only. They should run once per update, not once per layer.
		 */
		scaleCanvas(context, k.width, k.height);
		context.clearRect(0, 0, k.width, k.height);

		/**
		 * Draw our scatterplot
		 */
		k.data.forEach((/** @type {any} d */ d) => {
			context.beginPath();
			context.arc(k.xGet(d), k.yGet(d), r, 0, 2 * Math.PI, false);
			context.lineWidth = strokeWidth;
			context.strokeStyle = stroke;
			context.stroke();
			context.fillStyle = fill;
			context.fill();
		});
	});
</script>
