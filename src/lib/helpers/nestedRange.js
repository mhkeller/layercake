import hasBandwidth from '../utils/hasBandwidth.js';

/**
 * The default range for a nested dimension: one slot of its parent.
 *
 * Read off the parent's own range rather than the chart width so the units come
 * along with it – under `percentRange` the parent measures 0 to 100, and a
 * pixel-width fallback would put the nested offsets in a different coordinate
 * system than the marks they get added to.
 * @param {any} parentScale The computed scale of the dimension this one nests inside, e.g. `x` for `x2`.
 * @param {number} chartSpan How wide the chart is in the current units, for when there's no parent to nest inside.
 * @returns {[number, number]} The range.
 */
export default function nestedRange(parentScale, chartSpan) {
	// A band or point parent hands us a slot width directly
	if (hasBandwidth(parentScale)) return [0, parentScale.bandwidth()];

	const range = typeof parentScale?.range === 'function' ? parentScale.range() : null;
	const first = range?.[0];
	const last = range?.[range.length - 1];

	// No parent, or one whose range isn't a span we can measure – a color scale,
	// say – so fill the chart
	if (typeof first !== 'number' || typeof last !== 'number') return [0, chartSpan];

	return [0, Math.abs(last - first)];
}
