/* --------------------------------------------
 *
 * Determine whether a scale is a log, symlog, power or other
 * This is not meant to be exhaustive of all the different types of
 * scales in d3-scale and focuses on continuous scales
 *
 * --------------------------------------------
 */
import arraysEqual from '../utils/arraysEqual.js';

export default function findScaleType(scale) {
	/**
	 * Ordinal scales
	 *  Determine whether a scale is an ordinal scale
   *  https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
	 */
	// scaleBand, scalePoint
	if (typeof scale.bandwidth === 'function') {
		if (typeof scale.paddingInner === 'number') {
			return 'band'
		}
		return 'point'
	}
	// scaleOrdinal
	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'unknown', 'copy'])) {
		return 'ordinal';
	}

	/**
	 * Continuous scales
	 */
	if (scale.constant) {
		return 'symlog';
	}
	if (scale.base) {
		return 'log';
	}
	if (scale.exponent) {
		if (scale.exponent() === 0.5) {
			return 'sqrt';
		}
		return 'pow';
	}

	return 'linear';
}
