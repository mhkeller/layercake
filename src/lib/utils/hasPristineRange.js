/**
 * Whether a scale's range is d3's untouched default – `[]` for ordinal and
 * quantile scales, `[0, 1]` for continuous, band, point, quantize and
 * threshold scales, `[0, 0.5, 1]` for diverging scales – meaning the user
 * hasn't customized it. Scales without a `.range` method count as pristine so
 * the caller's default-range logic stays in charge.
 * @param {any} scale A D3 scale.
 * @returns {boolean}
 */
export default function hasPristineRange(scale) {
	if (typeof scale?.range !== 'function') return true;
	const range = scale.range();
	if (!Array.isArray(range) || range.length === 0) return true;
	if (range.length === 2 && range[0] === 0 && range[1] === 1) return true;
	// A diverging scale's untouched default is three stops. Requiring an
	// `.interpolator` method keeps this from matching a piecewise linear scale
	// where a user set [0, 0.5, 1] on purpose – linear scales have no interpolator.
	return (
		range.length === 3 &&
		range[0] === 0 &&
		range[1] === 0.5 &&
		range[2] === 1 &&
		typeof scale.interpolator === 'function'
	);
}
