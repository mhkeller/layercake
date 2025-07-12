/**
	Flatten arrays of arrays one level deep
	@param {Array<any>} list The list to flatten.
	@param {string|Function} accessor An optional accessor function to map by. If this is a string, it will be transformed into an accessor for that key.
	@returns {Array<any>}
*/
export default function flatten(list, accessor = /** @param {any} d */ d => d) {
	if (!Array.isArray(list)) {
		return list;
	}

	const acc = typeof accessor === 'string' ? /** @param {any} d */ d => d[accessor] : accessor;

	const firstResult = acc(list[0]);
	if (Array.isArray(firstResult)) {
		return list.flatMap(/** @type {(value: any) => any} */ (acc));
	}
	return list;
}
