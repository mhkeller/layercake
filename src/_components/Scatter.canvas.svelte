<!--
	@component
	Generates a canvas scatter plot. If the x or y scale is a band scale, each circle sits in the middle of its band.
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
		k.data.forEach(d => {
			const cx = k.xGet(d) + (k.xScale.bandwidth ? k.xScale.bandwidth() / 2 : 0);
			const cy = k.yGet(d) + (k.yScale.bandwidth ? k.yScale.bandwidth() / 2 : 0);
			ctx.beginPath();
			ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
			// Fill first, then stroke on top, the same as an SVG circle
			ctx.fillStyle = fill;
			ctx.fill();
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = stroke;
			ctx.stroke();
		});
	});
</script>
