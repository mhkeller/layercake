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
	// console.log('a', performance.now());
	if (!Array.isArray(data)) {
		throw new TypeError('The first argument of calcExtents() must be an array.');
	}

	// console.log('b', performance.now());
	if (
		Array.isArray(fields)
		|| fields === undefined
		|| fields === null
	) {
		throw new TypeError('The second argument of calcExtents() must be an '
		+ 'object with field names as keys as accessor functions as values.');
	}

	const extents = {};

	// console.log('c', performance.now());
	const keys = ['x'];
	// console.log('d', performance.now());
	const kl = keys.length;
	let i;
	let j;
	let val;
	let s;
	let acc;
	// console.log('e', performance.now());

	const dl = data.length;
	// console.log('f', performance.now());
	for (j = 0; j < kl; j += 1) {
		// console.log('g', performance.now());
		s = keys[j];
		extents[s] = [null, null];
		acc = fields[s];
		// console.log('h', performance.now());
		for (i = 0; i < dl; i += 1) {
			// console.log('i', performance.now());
			val = acc(data[i]);
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
				// console.log('j', performance.now());
				if (extents[s][0] === null || val < extents[s][0]) {
					// console.log('k', performance.now());
					extents[s][0] = val;
				}
				// console.log('l', performance.now());
				if (extents[s][1] === null || val > extents[s][1]) {
					// console.log('m', performance.now());
					extents[s][1] = val;
				}
			}
		}
	}

	return extents;
}
