/**
 * Complain about a chart that has no room to draw in. Nearly always a CSS
 * problem – the container has no size, so neither does the chart.
 * @param {number} width The drawable width, i.e. the container width minus padding.
 * @param {number} height The drawable height, i.e. the container height minus padding.
 */
export default function warnEmptySize(width, height) {
	if (width <= 0) {
		console.warn(
			'[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?'
		);
	}
	if (height <= 0) {
		console.warn(
			'[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?'
		);
	}
}
