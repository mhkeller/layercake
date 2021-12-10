/* --------------------------------------------
 *
 * Returns a modified scale domain by in/decreasing
 * the min/max by taking the desired difference
 * in pixels and converting it to units of data.
 * Returns an array that you can set as the new domain.
 * Padding contributed by @veltman.
 * See here for discussion of transforms: https://github.com/d3/d3-scale/issues/150
 *
 * --------------------------------------------
 */
import getPadFunctions from '../helpers/getPadFunctions.js';

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

	if (scale.domain().length !== 2) {
		console.warn('[LayerCake] The scale is expected to have a domain of length 2 to use padding. Are you sure you want to use padding? Your scale\'s domain is:', scale.domain());
	}
	if (scale.range().length !== 2) {
		console.warn('[LayerCake] The scale is expected to have a range of length 2 to use padding. Are you sure you want to use padding? Your scale\'s range is:', scale.range());
	}

	const { lift, ground } = getPadFunctions(scale);

	const d0 = scale.domain()[0];

	const isTime = Object.prototype.toString.call(d0) === '[object Date]';

	const [d1, d2] = scale.domain().map(d => {
		return isTime ? lift(d.getTime()) : lift(d);
	});
	const [r1, r2] = scale.range();
	const paddingLeft = padding[0] || 0;
	const paddingRight = padding[1] || 0;

	const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight); // Math.abs() to properly handle reversed scales

	return [d1 - paddingLeft * step, paddingRight * step + d2].map(d => {
		return isTime ? ground(new Date(d)) : ground(d);
	});
}
