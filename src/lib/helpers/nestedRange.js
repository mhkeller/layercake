import hasBandwidth from '../utils/hasBandwidth.js';

/**
 * The default range for a nested dimension: one band of its parent.
 *
 * It's read off the parent's range so the units match. Under `percentRange`
 * the parent runs 0 to 100. Falling back to the chart's pixel width there
 * would put the nested offsets in pixels while everything around them is in
 * percent.
 * @param {any} parentScale The computed scale of the dimension this one nests inside, e.g. `x` for `x2`.
 * @param {number} chartSpan The chart's width or height in the current units. Used when there is no parent scale.
 * @returns {[number, number]} The range.
 */
export default function nestedRange(parentScale, chartSpan) {
	// A band or point parent has a bandwidth we can use directly
	if (hasBandwidth(parentScale)) return [0, parentScale.bandwidth()];

	const range = typeof parentScale?.range === 'function' ? parentScale.range() : null;
	const first = range?.[0];
	const last = range?.[range.length - 1];

	// There's no parent, or its range isn't numbers (a color scale, for
	// example). Use the whole chart.
	if (typeof first !== 'number' || typeof last !== 'number') return [0, chartSpan];

	return [0, Math.abs(last - first)];
}
