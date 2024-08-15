import arraysEqual from '../utils/arraysEqual.js';

/**
  Determine whether a scale has an ordinal domain
	https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
	@param {Function} scale A D3 scale
	@returns {boolean} Whether the scale is an ordinal scale
 */
export default function isOrdinalDomain(scale) {
	// scaleBand, scalePoint
	// @ts-ignore
	if (typeof scale.bandwidth === 'function') {
		return true;
	}
	// scaleOrdinal
	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'unknown', 'copy'])) {
		return true;
	}
	return false;
}
