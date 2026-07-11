/**
	Scales a canvas. From Paul Lewis: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
	@param {CanvasRenderingContext2D} ctx A canvas context.
	@param {number} width The container width.
	@param {number} height The container height.
	@returns {{width: number, height: number}}
*/
export default function (ctx, width, height) {
	const dpr = window.devicePixelRatio || 1;
	const bufferWidth = width * dpr;
	const bufferHeight = height * dpr;

	// Setting canvas.width clears the buffer and resets the transform, so skip if unchanged
	if (ctx.canvas.width === bufferWidth && ctx.canvas.height === bufferHeight) {
		return { width: bufferWidth, height: bufferHeight };
	}

	ctx.canvas.width = bufferWidth;
	ctx.canvas.height = bufferHeight;
	ctx.canvas.style.width = `${width}px`;
	ctx.canvas.style.height = `${height}px`;
	ctx.scale(dpr, dpr);

	return { width: bufferWidth, height: bufferHeight };
}
