import isOrdinalDomain from '../helpers/isOrdinalDomain.js';
import getPadFunctions from '../helpers/getPadFunctions.js';
import findScaleName from '../helpers/findScaleName.js';

// These scales have a discrete range so they can't be padded
const unpaddable = ['scaleThreshold', 'scaleQuantile', 'scaleQuantize', 'scaleSequentialQuantile'];

/**
 * @typedef {import('d3-scale').ScaleLinear<any, any> |
 *           import('d3-scale').ScaleTime<any, any> |
 *           import('d3-scale').ScalePower<any, any> |
 *           import('d3-scale').ScaleLogarithmic<any, any> |
 *           import('d3-scale').ScaleSymLog<any, any> |
 *           import('d3-scale').ScaleOrdinal<any, any> |
 *           import('d3-scale').ScaleBand<any> |
 *           import('d3-scale').ScalePoint<any> |
 *           import('d3-scale').ScaleSequential<any, any> |
 *           import('d3-scale').ScaleDiverging<any, any>} Scale
 */

/**
	Returns a modified scale domain by in/decreasing
	the min/max by taking the desired difference
	in pixels and converting it to units of data.
	Returns an array that you can set as the new domain.
	Padding contributed by @veltman.
	See here for discussion of transforms: https://github.com/d3/d3-scale/issues/150
	@param {Scale} scale A D3 scale funcion
	@param {[number, number]} padding A two-value array of numbers specifying padding in pixels
	@returns {any[]} The padded domain
*/
export default function padScale(scale, padding) {
	if (typeof scale.range !== 'function') {
		throw new Error('Scale method `range` must be a function');
	}
	if (typeof scale.domain !== 'function') {
		throw new Error('Scale method `domain` must be a function');
	}

	if (!Array.isArray(padding) || unpaddable.includes(findScaleName(scale))) {
		return scale.domain();
	}

	if (isOrdinalDomain(scale) === true) {
		return scale.domain();
	}

	const { lift, ground } = getPadFunctions(scale);

	const d0 = scale.domain()[0];

	const isTime = Object.prototype.toString.call(d0) === '[object Date]';

	const [d1, d2] = scale.domain().map(d => {
		return isTime ? lift(d.getTime()) : lift(d);
	});
	const [r1, r2] = /** @type {[number, number]} */ (scale.range());
	const paddingLeft = padding[0] || 0;
	const paddingRight = padding[1] || 0;

	const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight); // Math.abs() to properly handle reversed scales

	return [d1 - paddingLeft * step, paddingRight * step + d2].map(d => {
		return isTime ? ground(new Date(d)) : ground(d);
	});
}
