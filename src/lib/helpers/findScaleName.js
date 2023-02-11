import arraysEqual from '../utils/arraysEqual.js';
import t from '../helpers/toTitleCase.js';

function f(name, modifier = '') {
	return `scale${t(modifier)}${t(name)}`;
}

/**
  Get a D3 scale name
	https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
	@param {Function} scale A D3 scale
	@returns {String} The scale's name
 */
export default function findScaleName(scale) {
	// scaleBand, scalePoint
	// @ts-ignore
	if (typeof scale.bandwidth === 'function') {
		// @ts-ignore
		if (typeof scale.paddingInner === 'function') {
			return f('band');
		}
		return f('point');
	}
	// scaleOrdinal
	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'unknown', 'copy'])) {
		return f('ordinal');
	}

	let modifier = ''
	// @ts-ignore
	if (scale.interpolator) {
		// @ts-ignore
		const domain = scale.domain();
		if (domain.length === 3) {
			modifier = 'diverging';
		} else if (domain.length === 2) {
			modifier = 'sequential';
		}
	}

	/**
	 * Continuous scales
	 */
	// @ts-ignore
	if (scale.constant) {
		return f('symlog', modifier);
	}
	// @ts-ignore
	if (scale.base) {
		return f('log', modifier);
	}
	// @ts-ignore
	if (scale.exponent) {
		// @ts-ignore
		if (scale.exponent() === 0.5) {
			return f('sqrt', modifier);
		}
		return f('pow', modifier);
	}

	if (modifier) {
		return f(modifier);
	}

	return f('linear');
}
