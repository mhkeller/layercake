/**
 * From Paul Lewis:
 * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export default function (canvas, ctx, width, height) {
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
		canvas.width = width * ratio;
		canvas.height = height * ratio;

		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
	} else {
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = '';
		canvas.style.height = '';
	}

	ctx.scale(ratio, ratio);
	return { width: canvas.width, height: canvas.height };
}
