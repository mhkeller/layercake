import arraysEqual from '../utils/arraysEqual.js';

function f(name) {
	return `scale${name.replace(/^\w/, (d) => d.toUpperCase())}`;
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

	/**
	 * Continuous scales
	 */
	// @ts-ignore
	if (scale.constant) {
		return f('symlog');
	}
	// @ts-ignore
	if (scale.base) {
		return f('log');
	}
	// @ts-ignore
	if (scale.exponent) {
		// @ts-ignore
		if (scale.exponent() === 0.5) {
			return f('sqrt');
		}
		return f('pow');
	}

	return f('linear');
}
