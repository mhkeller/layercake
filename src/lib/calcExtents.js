/* --------------------------------------------
 *
 * Calculate the extents of desired fields
 * Returns an object like:
 * `{x: [0, 10], y: [-10, 10]}` if `fields` is
 * `[{field:'x', accessor: d => d.x}, {field:'y', accessor: d => d.y}]`
 *
 * --------------------------------------------
 */
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

	const keys = Object.keys(fields);
	const kl = keys.length;
	let i;
	let j;
	let val;
	let s;
	let acc;

	const dl = data.length;
	for (i = 0; i < kl; i += 1) {
		s = keys[i];
		extents[s] = [null, null];
		acc = fields[s];
		for (j = 0; j < dl; j += 1) {
			val = acc(data[j]);
			if (Array.isArray(val)) {
				const vl = val.length;
				for (let k = 0; k < vl; k += 1) {
					if (val[k] !== undefined && val[k] !== null && Number.isNaN(val[k]) === false) {
						if (extents[s][0] === null || val[k] < extents[s][0]) {
							extents[s][0] = val[k];
						}
						if (extents[s][1] === null || val[k] > extents[s][1]) {
							extents[s][1] = val[k];
						}
					}
				}
			} else if (val !== undefined && val !== null && Number.isNaN(val) === false) {
				if (extents[s][0] === null || val < extents[s][0]) {
					extents[s][0] = val;
				}
				if (extents[s][1] === null || val > extents[s][1]) {
					extents[s][1] = val;
				}
			}
		}
	}

	return extents;
}
