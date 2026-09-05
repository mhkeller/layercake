/**
 * Read the range off of a scale.
 * @param {any} scale The scale.
 * @returns {Array<any>|null} The scale's range.
 */
export default function getRange(scale) {
	if (typeof scale === 'function') {
		if (typeof scale.range === 'function') {
			return scale.range();
		}
		console.error("[LayerCake] Your scale doesn't have a `.range` method?");
	}
	return null;
}
