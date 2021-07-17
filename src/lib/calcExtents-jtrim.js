/* --------------------------------------------
 *
 * Calculate the extents of desired fields
 * Returns an object like:
 * `{ x: [0, 10], y: [-10, 10] }` if `fields` is
 * `{'x': d => d.x, 'y': d => d.y}`
 *
 * --------------------------------------------
 */
import minMax from '../utils/minMax.js';

const min = minMax('min');
const max = minMax('max');

export default function calcExtents (data, fields) {
	if (!Array.isArray(data)) {
		throw new TypeError('The first argument of calcExtents() must be an array.');
	}

	if (
		Array.isArray(fields)
		|| fields === undefined
		|| fields === null
	) {
		throw new TypeError('The second argument of calcExtents() must be an '
		+ 'object with field names as keys as accessor functions as values.');
	}

	const extents = {};

	const dl = data.length;
	const fls = Object.keys(fields);
	const fl = fls.length;
	for (let i = 0; i < fl; i += 1) {
		const s = fls[i];
		const accessor = fields[s];
		extents[s] = [null, null];
		for (let j = 0; j < dl; j += 1) {
			const val = accessor(data[j]);
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
