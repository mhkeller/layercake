/**
 * Whether a scale's range is d3's untouched default – `[]` for ordinal and
 * quantile scales, `[0, 1]` for continuous, band, point, quantize and
 * threshold scales – meaning the user hasn't customized it. Scales without
 * a `.range` method count as pristine so the caller's default-range logic
 * stays in charge.
 * @param {any} scale A D3 scale.
 * @returns {boolean}
 */
export default function hasPristineRange(scale) {
	if (typeof scale?.range !== 'function') return true;
	const range = scale.range();
	if (!Array.isArray(range) || range.length === 0) return true;
	return range.length === 2 && range[0] === 0 && range[1] === 1;
}
