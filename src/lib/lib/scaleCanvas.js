/**
	Scales a canvas. From Paul Lewis: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
	@param {CanvasRenderingContext2D} ctx A canvas context.
	@param {Number} width The container width.
	@param {Number} height The container height.
	@returns {{width: Number, height: Number}}
*/
export default function (ctx, width, height) {
	const dpr = window.devicePixelRatio || 1;

	ctx.canvas.width = width * dpr;
	ctx.canvas.height = height * dpr;

	ctx.canvas.style.width = `${width}px`;
	ctx.canvas.style.height = `${height}px`;

	ctx.scale(dpr, dpr);
	return { width: ctx.canvas.width, height: ctx.canvas.height };
}
