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
		throw new Error('Scale method `range` must be a function');
	}
	if (typeof scale.domain !== 'function') {
		throw new Error('Scale method `domain` must be a function');
	}
	if (!Array.isArray(padding)) {
		return scale.domain();
	}

	const domain = scale.domain();

	const range = scale.range();
	const domainExtent = domain[1] - domain[0];

	const w = Math.abs(range[1] - range[0]);

	const paddedDomain = domain.slice();
	const pl = padding.length;
	for (let i = 0; i < pl; i += 1) {
		const sign = i === 0 ? -1 : 1;
		const isTime = Object.prototype.toString.call(domain[i]) === '[object Date]';

		const perc = padding[i] / w;
		const paddingAdjuster = domainExtent * perc;
		const d = (isTime ? domain[i].getTime() : domain[i]);
		const adjustedDomain = d + paddingAdjuster * sign;
		paddedDomain[i] = isTime ? new Date(adjustedDomain) : adjustedDomain;
	}
	return paddedDomain;
}
