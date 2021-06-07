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
	if (!Array.isArray(data) || data.length === 0) return {};
	const extents = {};

	if (Array.isArray(fields)) {
	    // Old API using array for `fields`
        const fl = fields.length;

        let fieldsObj = {};
        fields.forEach(f => {
            fieldsObj[f.field] = f.accessor;
        });
        fields = fieldsObj;
    }

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
	arr.forEach(val => {
		if (val !== undefined && val !== null && !Number.isNaN(val)) {
			result = result === null || val < result ? val : result;
		}
	});
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
	arr.forEach(val => {
		if (val !== undefined && val !== null && !Number.isNaN(val)) {
			result = result === null || val > result ? val : result;
		}
	});
	return result;
}

