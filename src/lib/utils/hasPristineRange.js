/**
 * Whether a scale still has the range d3 gives it out of the box, meaning the
 * user hasn't set one. That default is `[]` for ordinal and quantile scales,
 * `[0, 1]` for continuous, band, point, quantize and threshold scales, and
 * `[0, 0.5, 1]` for diverging scales. A scale with no `.range` method counts
 * as untouched so the caller still applies its default range.
 * @param {any} scale A D3 scale.
 * @returns {boolean}
 */
export default function hasPristineRange(scale) {
	if (typeof scale?.range !== 'function') return true;
	const range = scale.range();
	if (!Array.isArray(range) || range.length === 0) return true;
	if (range.length === 2 && range[0] === 0 && range[1] === 1) return true;
	// A diverging scale's default has three stops. Also require an
	// `.interpolator` method so this doesn't match a linear scale where the user
	// set [0, 0.5, 1] on purpose. Linear scales have no interpolator.
	return (
		range.length === 3 &&
		range[0] === 0 &&
		range[1] === 0.5 &&
		range[2] === 1 &&
		typeof scale.interpolator === 'function'
	);
}
