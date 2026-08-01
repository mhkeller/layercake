import arraysEqual from '../utils/arraysEqual.js';
import t from '../helpers/toTitleCase.js';

/**
 * Build a scale's exported name, e.g. `band` -> `scaleBand`.
 * @param {string} name The scale kind.
 * @param {string} [modifier] A prefix such as `sequential` or `diverging`.
 * @returns {string}
 */
function f(name, modifier = '') {
	return `scale${t(modifier)}${t(name)}`;
}

/**
  Get a D3 scale name
	https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
	@param {any} scale A D3 scale. Typed loosely because we probe for methods that only some scales have.
	@returns {string} The scale's name
 */
export default function findScaleName(scale) {
	/**
	 * Ordinal scales
	 */
	// scaleBand, scalePoint
	if (typeof scale.bandwidth === 'function') {
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
	let modifier = '';
	if (scale.interpolator) {
		if (scale.domain().length === 3) {
			modifier = 'diverging';
		} else {
			modifier = 'sequential';
		}
	}

	/**
	 * Continuous scales
	 */
	if (scale.quantiles) {
		return f('quantile', modifier);
	}
	if (scale.thresholds) {
		return f('quantize', modifier);
	}
	if (scale.constant) {
		return f('symlog', modifier);
	}
	if (scale.base) {
		return f('log', modifier);
	}
	if (scale.exponent) {
		if (scale.exponent() === 0.5) {
			return f('sqrt', modifier);
		}
		return f('pow', modifier);
	}

	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'invertExtent', 'unknown', 'copy'])) {
		return f('threshold');
	}

	if (
		arraysEqual(Object.keys(scale), [
			'invert',
			'range',
			'domain',
			'unknown',
			'copy',
			'ticks',
			'tickFormat',
			'nice'
		])
	) {
		return f('identity');
	}

	if (
		arraysEqual(Object.keys(scale), [
			'invert',
			'domain',
			'range',
			'rangeRound',
			'round',
			'clamp',
			'unknown',
			'copy',
			'ticks',
			'tickFormat',
			'nice'
		])
	) {
		return f('radial');
	}

	if (modifier) {
		return f(modifier);
	}

	/**
	 * Test for scaleTime vs scaleUtc
	 * https://github.com/d3/d3-scale/pull/274#issuecomment-1462935595
	 */
	if (scale.domain()[0] instanceof Date) {
		// We deliberately monkey-patch the Date to see which method d3 calls
		const d = /** @type {any} */ (new Date());
		/** @type {any} */
		let s;
		d.getDay = () => (s = 'time');
		d.getUTCDay = () => (s = 'utc');

		scale.tickFormat(0, '%a')(d);
		return f(s);
	}

	return f('linear');
}
