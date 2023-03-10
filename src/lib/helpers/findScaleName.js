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
	/**
	 * Ordinal scales
	 */
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
	 * Sequential versus divergin
	 */
	let domain;
	let modifier = ''
	// @ts-ignore
	if (scale.interpolator) {
		// @ts-ignore
		domain = scale.domain();
		if (domain.length === 3) {
			modifier = 'diverging';
		} else {
			modifier = 'sequential';
		}
	}

	/**
	 * Continuous scales
	 */
	// @ts-ignore
	if (scale.quantiles) {
		return f('quantile', modifier);
	}
	if (scale.thresholds) {
		return f('quantize', modifier);
	}
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

	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'invertExtent', 'unknown', 'copy'])) {
		return f('threshold');
	}

	if (arraysEqual(Object.keys(scale), ['invert', 'range', 'domain', 'unknown', 'copy', 'ticks', 'tickFormat', 'nice'])) {
		return f('identity');
	}

	if (
		arraysEqual(Object.keys(scale), [
			'invert', 'domain', 'range', 'rangeRound', 'round', 'clamp', 'unknown', 'copy', 'ticks', 'tickFormat', 'nice'
		])
	) {
		return f('radial');
	}

	if (modifier) {
		return f(modifier);
	}

	if (!domain) {
		// @ts-ignore
		domain = scale.domain()
	}



	/**
	 * Test for scaleTime vs scaleUtc
	 * https://github.com/d3/d3-scale/pull/274#issuecomment-1462935595
	 */
	if (domain[0] instanceof Date) {
		const d = new Date;
		let format;
		// @ts-ignore
		d.getDay = () => format = 'time';
		// @ts-ignore
		d.getUTCDay = () => format = 'utc';

		// @ts-ignore
		scale.copy().tickFormat(0, '%a')(d);
		return f(format);
	}

	return f('linear');
}
