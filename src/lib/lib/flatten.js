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
			flat = flat.concat(list[i]);
		}
		return flat;
	}
	return list;
}
