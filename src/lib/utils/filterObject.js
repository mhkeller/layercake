/**
	Drop every field whose value is undefined, plus any key that also shows up on a second object
	@template T
	@param {Record<string, T>} obj The object to filter
	@param {Record<string, any>} [comparisonObj={}] Keys on this object get dropped from the result. What they map to doesn't matter – `0` and `false` drop the key just the same – except that `undefined` reads as the key not being there, so it stays.
	@returns {Record<string, T>} The object with the same value type, minus the filtered keys
*/
export default function filterObject(obj, comparisonObj = {}) {
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => {
			return value !== undefined && comparisonObj[key] === undefined;
		})
	);
}
