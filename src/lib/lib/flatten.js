/**
	Flatten arrays of arrays one level deep
	@param {Array} list The list to flatten.
	@param {string|Function} accessor An optional accessor function. If this is a string, it will be transformed into an accessor for that key.
	@returns {Array}
*/
export default function flatten(list, accessor = d => d) {
	const acc = typeof accessor === 'string' ? d => d[accessor] : accessor;
	if (Array.isArray(list) && Array.isArray(acc(list[0]))) {
		let flat = [];
		const l = list.length;
		for (let i = 0; i < l; i += 1) {
			flat = flat.concat(acc(list[i]));
		}
		return flat;
	}
	return list;
}
