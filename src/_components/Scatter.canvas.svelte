<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { getLayerCakeContext, getCanvasContext } from 'layercake';

	const k = getLayerCakeContext();
	const canvas = getCanvasContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	// Layer Cake runs this on every repaint: resize, new data or a prop change
	canvas.draw(ctx => {
		k.data.forEach((/** @type {any} d */ d) => {
			ctx.beginPath();
			ctx.arc(k.xGet(d), k.yGet(d), r, 0, 2 * Math.PI, false);
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = stroke;
			ctx.stroke();
			ctx.fillStyle = fill;
			ctx.fill();
		});
	});
</script>
