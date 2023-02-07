/* --------------------------------------------
 *
 * Determine whether a scale is an ordinal scale
 * https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
 *
 */
import arraysEqual from '../utils/arraysEqual.js';

export default function isOrdinalScale(scale) {
	// scaleBand, scalePoint
	if (typeof scale.bandwidth === 'function') {
		return 'ordinal';
	}
	// scaleOrdinal
	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'unknown', 'copy'])) {
		return 'ordinal';
	}
	return 'other';
}
