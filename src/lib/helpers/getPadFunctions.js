import findScaleType from './findScaleType.js';
import identity from '../utils/identity.js';

function log(sign) {
	return x => Math.log(sign * x);
}

function exp(sign) {
	return x => sign * Math.exp(x);
}

function symlog(c) {
	return x => Math.sign(x) * Math.log1p(Math.abs(x / c));
}

function symexp(c) {
	return x => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}

function pow(exponent) {
	return function powFn(x) {
		return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	};
}

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
