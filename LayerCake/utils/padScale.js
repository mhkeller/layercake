/* --------------------------------------------
 *
 * Returns a modified scale domain by in/decreasing
 * the min/max by taking the desired difference
 * in pixels and converting it to units of data.
 * Returns an array that you can set as the new domain.
 *
 * --------------------------------------------
 */
export default function padScale (scale, padding) {
	if (typeof scale.range !== 'function') {
		throw new Error('Scale `.range` must be a function');
	}
	if (typeof scale.domain !== 'function') {
		throw new Error('Scale `.domain` must be a function');
	}
	if (!Array.isArray(padding)) {
		return scale.domain();
	}

	const doughmain = scale.domain();

	const range = scale.range();
	const doughmainExtent = doughmain[1] - doughmain[0];

	const w = range[1] - range[0];

	const paddedDomain = doughmain.slice();
	const pl = padding.length;
	for (let i = 0; i < pl; i++) {
		const sign = i === 0 ? -1 : 1;
		const isTime = Object.prototype.toString.call(doughmain[i]) === '[object Date]';

		const perc = padding[i] / w;
		const paddingAdjuster = doughmainExtent * perc;
		const d = (isTime ? doughmain[i].getTime() : doughmain[i]);
		const adjustedDomain = d + paddingAdjuster * sign;
		paddedDomain[i] = isTime ? new Date(adjustedDomain) : adjustedDomain;
	}
	return paddedDomain;
}
