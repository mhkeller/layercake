/* --------------------------------------------
 *
 * Determine whether a scale is an ordinal scale
 * https://svelte.dev/repl/ec6491055208401ca41120c9c8a67737?version=3.49.0
 *
 */
export default function isOrdinalScale(scale) {
	// scaleBand, scalePoint
	if (scale.bandwidth) {
		return 'ordinal';
	}
	// scaleOrdinal
	if (arraysEqual(Object.keys(scale), ['domain', 'range', 'unknown', 'copy'])) {
		return 'ordinal';
	}
	return 'other';
}

function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	return arr1.every(k => {
		return arr2.includes(k);
	});
}
