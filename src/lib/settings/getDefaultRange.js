/**
 * Determine the range for a dimension's scale, in order of priority:
 * a user-passed range (array or function), the global `percentRange`
 * setting (if the dimension supports it) or the dimension's default.
 * @param {import('./dimensions.js').Dimension} dimension The dimension's entry in the registry in settings/dimensions.js.
 * @param {Object} config
 * @param {boolean} [config.reverse] Whether to reverse the default range. Has no effect when the user supplies a range.
 * @param {Array<any>|Function|undefined} [config.range] The user-passed `[name]Range` prop, either an array or a function that receives `({ width, height, scales })`. A null prop was already turned into undefined in state/dimension.svelte.js.
 * @param {import('./dimensions.js').DimensionRangeContext} config.ctx The chart values a range function is allowed to read. Built in createScale.js.
 * @returns {Array<any>} The range for the scale.
 */
export default function getDefaultRange(dimension, { reverse = false, range, ctx }) {
	if (range) {
		return typeof range === 'function' ? range(ctx) : range;
	}
	if (dimension.canBePercentRange === true && ctx.percentRange === true) {
		return reverse === true ? [100, 0] : [0, 100];
	}
	const base = dimension.defaultRange(ctx);
	return reverse === true ? base.slice().reverse() : base;
}
