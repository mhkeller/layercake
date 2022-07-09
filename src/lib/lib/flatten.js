/**
	Flatten arrays of arrays one level deep
	@param {Array} list The list to flatten.
	@returns {Array}
*/
export default function flatten (list) {
	if (Array.isArray(list) && Array.isArray(list[0])) {
		let flat = [];
		const l = list.length;
		for (let i = 0; i < l; i += 1) {
			const ll = list[i].length;
			/* --------------------------------------------
			 * Maybe add any data keys onto the flattened object
			 * for help with computing z scales on stacked data structures
			 */
			for (let j = 0; j < ll; j += 1) {
				Object.assign(list[i][j], Object.fromEntries(Object.keys(list[i]).filter(k => {
					return Number.isNaN(+k);
				}).map(k => [k, list[i][k]])));
			}
			flat = flat.concat(list[i]);
		}
		return flat;
	}
	return list;
}
