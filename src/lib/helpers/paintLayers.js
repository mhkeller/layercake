import scaleCanvas from '../lib/scaleCanvas.js';

/**
 * Paint every layer of a `<Canvas>` in one pass. The canvas covers the whole
 * chart container area so children can draw into the padding.
 * Each layer gets its own save/restore, so the styles and transforms it sets
 * don't reach the next one.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<{ fn: (ctx: CanvasRenderingContext2D) => void }>} layers
 * @param {{ containerWidth: number, containerHeight: number, width: number, height: number, padding: { top: number, left: number }, overflow?: 'visible'|'hidden' }} chart
 */
export default function paintLayers(ctx, layers, chart) {
	const { containerWidth, containerHeight, width, height, padding, overflow } = chart;
	const canvas = ctx.canvas;

	// Clear in device pixels. A clear in CSS pixels can miss a sliver at
	// fractional zoom levels.
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scaleCanvas(ctx, containerWidth, containerHeight);

	// translate() moves (0, 0) from the canvas corner to the top-left of the
	// chart area, so draw functions use chart coordinates like Svg/Html children do.
	// With overflow="hidden", clip to that area. The save/restore around both
	// leaves the context as scaleCanvas set it once this run ends. We need this
	// because the clip stays until restore() is called. The next run's clear and
	// clip() would be stuck inside it.
	ctx.save();
	ctx.translate(padding.left, padding.top);
	if (overflow === 'hidden') {
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.clip();
	}
	for (const layer of layers) {
		ctx.save();
		// Safety net: a layer that forgets beginPath() would otherwise draw the
		// clip rect or the previous layer's path
		ctx.beginPath();
		try {
			layer.fn(ctx);
		} catch (err) {
			// A throwing layer shouldn't be fatal. If the error escaped the
			// effect, Svelte would never wire up its dependencies and the canvas would
			// stay blank.
			console.error('[LayerCake] A canvas draw function threw an error:', err);
		} finally {
			ctx.restore();
		}
	}
	ctx.restore();
}
