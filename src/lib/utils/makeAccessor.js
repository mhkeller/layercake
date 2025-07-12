import canBeZero from './canBeZero.js';
/**
	Make an accessor from a string, number, function or an array of the combination of any
	@param {string|number|Function|Array<string|number|Function>} acc The accessor function, key or list of them.
	@returns {((d: any) => any)|((d: any) => any[])|Function|null} An accessor function that returns a single value or array of values, or null.
*/
export default function makeAccessor(acc) {
	if (!canBeZero(acc)) return null;
	if (Array.isArray(acc)) {
		return /** @param {any} d @returns {any[]} */ d =>
			acc.map(k => {
				return typeof k !== 'function' ? d[k] : k(d);
			});
	} else if (typeof acc !== 'function') {
		return /** @param {any} d @returns {any} */ d => d[acc];
	}
	return acc;
}
