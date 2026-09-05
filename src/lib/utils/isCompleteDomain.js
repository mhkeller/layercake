/**
 * Whether the user passed a domain we can use as-is – an array with both ends
 * filled in. Anything else (a function, an empty array or an array with a
 * `null` or `undefined` placeholder) needs an extent measured from the data
 * first.
 * @param {Array<string|number|null>|Function|undefined} domain The `[name]Domain` prop.
 * @returns {domain is Array<string|number>}
 */
export default function isCompleteDomain(domain) {
	if (!domain) return false;
	if (typeof domain === 'function') return false;
	if (Array.isArray(domain)) {
		// `[]` and `[undefined, 10]` are as incomplete as `[null, 10]`.
		if (domain.length === 0) return false;
		if (domain.some(d => d === null || d === undefined)) return false;
	}
	return true;
}
