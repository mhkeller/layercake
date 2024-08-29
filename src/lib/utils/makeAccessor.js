import canBeZero from './canBeZero.js';
/**
	Make an accessor from a string, number, function or an array of the combination of any
	@param {string|number|Function|Array<string|number|Function>} acc The accessor function, key or list of them.
	@returns {Function|null} An accessor function.
*/
export default function makeAccessor(acc) {
	if (!canBeZero(acc)) return null;
	if (Array.isArray(acc)) {
		return /** @param {any} d */ d =>
			acc.map(k => {
				return typeof k !== 'function' ? d[k] : k(d);
			});
	} else if (typeof acc !== 'function') {
		return /** @param {any} d */ d => d[acc];
	}
	return acc;
}
