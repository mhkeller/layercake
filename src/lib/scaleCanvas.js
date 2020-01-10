/**
 * From Paul Lewis:
 * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export default function (ctx, width, height) {
	const devicePixelRatio = window.devicePixelRatio || 1;

	const backingStoreRatio = (
		ctx.webkitBackingStorePixelRatio ||
		ctx.mozBackingStorePixelRatio ||
		ctx.msBackingStorePixelRatio ||
		ctx.oBackingStorePixelRatio ||
		ctx.backingStorePixelRatio || 1
	);

	const ratio = devicePixelRatio / backingStoreRatio;

	if (devicePixelRatio !== backingStoreRatio) {
		ctx.canvas.width = width * ratio;
		ctx.canvas.height = height * ratio;

		ctx.canvas.style.width = width + 'px';
		ctx.canvas.style.height = height + 'px';
	} else {
		ctx.canvas.width = width;
		ctx.canvas.height = height;
		ctx.canvas.style.width = '';
		ctx.canvas.style.height = '';
	}

	ctx.scale(ratio, ratio);
	return { width: ctx.canvas.width, height: ctx.canvas.height };
}
