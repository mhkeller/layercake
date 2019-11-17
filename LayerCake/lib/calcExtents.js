/* --------------------------------------------
 *
 * Calculate the extents of desired fields
 * Returns an object like `{x: [0, 10], y: [-10, 10]}` if `fields` is `[{field:'x', accessor: d => d.x}, {field:'y', accessor: d => d.y}]`
 *
 * --------------------------------------------
 */
export default function calcExtents (data, fields) {
	if (!Array.isArray(data) || data.length === 0) return null;
	const extents = {};
	const fl = fields.length;
	let i;
	let j;
	let f;
	let val;
	let s;

	if (fl) {
		for (i = 0; i < fl; i++) {
			const firstRow = fields[i].accessor(data[0]);
			extents[fields[i].field] = Array.isArray(firstRow) ? firstRow : [firstRow, firstRow];
		}
		const dl = data.length;
		for (i = 0; i < dl; i++) {
			for (j = 0; j < fl; j++) {
				f = fields[j];
				val = f.accessor(data[i]);
				s = f.field;
				if (Array.isArray(val)) {
					const vl = val.length;
					for (let k = 0; k < vl; k++) {
						if (val[k] !== undefined) {
							if (val[k] < extents[s][0]) {
								extents[s][0] = val[k];
							}
							if (val[k] > extents[s][1]) {
								extents[s][1] = val[k];
							}
						}
					}
				} else if (val !== undefined) {
					if (val < extents[s][0]) {
						extents[s][0] = val;
					}
					if (val > extents[s][1]) {
						extents[s][1] = val;
					}
				}
			}
		}
	} else {
		return null;
	}
	return extents;
}
