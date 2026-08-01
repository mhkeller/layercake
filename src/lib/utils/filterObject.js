/**
	Remove undefined fields from an object
	@template T
	@param {Record<string, T>} obj The object to filter
	@param {Object.<string, any>} [comparisonObj={}] An object that, for any key, if the key is not present on that object, the key will be filtered out. Note, this ignores the value on that object
	@returns {Record<string, T>} The object with the same value type, minus the filtered keys
*/
export default function filterObject(obj, comparisonObj = {}) {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => {
			return value !== undefined && comparisonObj[key] === undefined;
		})
	);
}
