import findScaleType from './findScaleType.js';
import identity from '../utils/identity.js';

/**
 * @param {number} sign
 * @returns {(x: number) => number}
 */
function log(sign) {
	return x => Math.log(sign * x);
}

/**
 * @param {number} sign
 * @returns {(x: number) => number}
 */
function exp(sign) {
	return x => sign * Math.exp(x);
}

/**
 * @param {number} c The symlog constant.
 * @returns {(x: number) => number}
 */
function symlog(c) {
	return x => Math.sign(x) * Math.log1p(Math.abs(x / c));
}

/**
 * @param {number} c The symlog constant.
 * @returns {(x: number) => number}
 */
function symexp(c) {
	return x => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}

/**
 * @param {number} exponent
 * @returns {(x: number) => number}
 */
function pow(exponent) {
	return function powFn(x) {
		return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	};
}

/**
 * Get the functions that move a domain into and out of the space its scale is
 * padded in, so that padding a log or power scale adds even pixel amounts.
 * @param {any} scale A D3 scale.
 * @returns {{ lift: (x: any) => any, ground: (x: any) => any, scaleType: string }}
 */
export default function getPadFunctions(scale) {
	const scaleType = findScaleType(scale);

	if (scaleType === 'log') {
		const sign = Math.sign(scale.domain()[0]);
		return { lift: log(sign), ground: exp(sign), scaleType };
	}
	if (scaleType === 'pow') {
		const exponent = 1;
		return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
	}
	if (scaleType === 'sqrt') {
		const exponent = 0.5;
		return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
	}
	if (scaleType === 'symlog') {
		const constant = 1;
		return { lift: symlog(constant), ground: symexp(constant), scaleType };
	}

	return { lift: identity, ground: identity, scaleType };
}
