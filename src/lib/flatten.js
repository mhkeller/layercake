/* --------------------------------------------
 *
 * Flatten arrays of arrays one level deep
 *
 * --------------------------------------------
 */
export default function flatten (arr) {
	if (Array.isArray(arr) && Array.isArray(arr[0])) {
		let flat = [];
		const l = arr.length;
		for (let i = 0; i < l; i += 1) {
			flat = flat.concat(arr[i]);
		}
		return flat;
	}
	return arr;
}
