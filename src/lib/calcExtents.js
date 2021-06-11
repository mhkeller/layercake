/* --------------------------------------------
 *
 * Calculate the extents of desired fields
 * Returns an object like:
 * `{x: [0, 10], y: [-10, 10]}` if `fields` is
 * `{'x': d => d.x, 'y': d => d.y}`
 *
 * --------------------------------------------
 */
export default function calcExtents (data, fields) {
	if (!Array.isArray(data)) {
		throw new TypeError("The first argument of calcExtents() must be an array.");
	}

	if (Array.isArray(fields)) {
		throw new TypeError("The second argument of calcExtents() must be an " +
			"object with field names as keys as accessor functions as values.");
	}

	const extents = {};

	const dl = data.length;
	for (let s in fields) {
		let accessor = fields[s];
		extents[s] = [null, null];
		for (let i = 0; i < dl; i += 1) {
			let val = accessor(data[i]);
			if (Array.isArray(val)) {
				extents[s][0] = min([extents[s][0], min(val)]);
				extents[s][1] = max([extents[s][1], max(val)]);
			} else {
				extents[s][0] = min([extents[s][0], val]);
				extents[s][1] = max([extents[s][1], val]);
			}
		}
	}

	return extents;
}

/* --------------------------------------------
 *
 * Calculate the minimum value of array arr.
 * Returns the minimum value or all non-undefined, non-null, non-NaN values
 * in the array; if no such value exists, null is returned.
 *
 * --------------------------------------------
 */
function min(arr) {
	let result = null;
	for (let i = 0; i < arr.length; i += 1) {
		let val = arr[i];
		if (val == null || Number.isNaN(val))
			continue;
		result = result === null || val < result ? val : result;
	}
	return result;
}

/* --------------------------------------------
 *
 * Calculate the maximum value of array arr.
 * Returns the maximum value or all non-undefined, non-null, non-NaN values
 * in the array; if no such value exists, null is returned.
 *
 * --------------------------------------------
 */
function max(arr) {
	let result = null;
	for (let i = 0; i < arr.length; i += 1) {
		let val = arr[i];
		if (val == null || Number.isNaN(val))
			continue;
		result = result === null || val > result ? val : result;
	}
	return result;
}
