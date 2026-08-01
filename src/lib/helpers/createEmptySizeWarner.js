import debounce from '../utils/debounce.js';

/**
 * Complain about a chart that has no room to draw in. Nearly always a CSS
 * problem – the container has no size, so neither does the chart.
 * @param {number} width The drawable width, i.e. the container width minus padding.
 * @param {number} height The drawable height, i.e. the container height minus padding.
 */
function warnEmptySize(width, height) {
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

/**
 * Make the size warner for one chart.
 *
 * It's debounced because the container hasn't reported its size yet on the
 * first run – `bind:clientWidth` lands a tick later – so warning eagerly would
 * call every chart with more than 100px of padding broken. Waiting also means a
 * chart being dragged through zero width only warns once, at the end.
 *
 * Each chart builds its own, since a single shared one would let two charts on
 * the same page cancel each other's pending warning and only the last would
 * ever speak up.
 * @returns {(width: number, height: number) => void}
 */
export default function createEmptySizeWarner() {
	return debounce(warnEmptySize, 200);
}
