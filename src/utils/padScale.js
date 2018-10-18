/* --------------------------------------------
 *
 * Returns a modified scale domain by in/decreasing
 * the min/max by taking the desired difference
 * in pixels and converting it to units of data.
 * Returns an array that you can set as the new domain.
 *
 * --------------------------------------------
 */
module.exports = function padScale (scale, padding) {
	const doughmain = scale.domain();
	if (!Array.isArray(padding) || typeof scale.invert !== 'function') {
		return doughmain.slice();
	}

	const paddedDomain = doughmain.slice();
	const pl = padding.length;
	for (let i = 0; i < pl; i++) {
		const sign = i === 0 ? -1 : 1;
		const isTime = Object.prototype.toString.call(doughmain[i]) === '[object Date]';

		const parts = [doughmain[i], scale.invert(padding[i]), scale.invert(0)].map(d => {
			return isTime ? d.getTime() : d;
		});
		paddedDomain[i] = [parts[0] + Math.abs(parts[1] - parts[2]) * sign].map(d => {
			return isTime ? new Date(d) : d;
		})[0];
	}
	return paddedDomain;
};
