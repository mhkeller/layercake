/**
	Scales a canvas. From Paul Lewis: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
	@param {CanvasRenderingContext2D} ctx A canvas context.
	@param {number} width The container width.
	@param {number} height The container height.
	@returns {{width: number, height: number}}
*/
export default function (ctx, width, height) {
	const dpr = window.devicePixelRatio || 1;
	const bufferWidth = Math.round(width * dpr);
	const bufferHeight = Math.round(height * dpr);

	// Setting canvas.width clears the buffer, so only resize when needed
	if (ctx.canvas.width !== bufferWidth || ctx.canvas.height !== bufferHeight) {
		ctx.canvas.width = bufferWidth;
		ctx.canvas.height = bufferHeight;
	}

	// Setting the style and transform is cheap and doesn't clear the buffer,
	// so always normalize them to the current size and device pixel ratio
	ctx.canvas.style.width = `${width}px`;
	ctx.canvas.style.height = `${height}px`;
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

	return { width: bufferWidth, height: bufferHeight };
}
