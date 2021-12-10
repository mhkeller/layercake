/**
	Calculate unique values from a list with an optional iterator string or function. By default return the transformed value if iteratee exists.
	@param {Array} list An array of values or objects.
	@param {String|Function} [accessor] An optional accessor function that takes an object and returns the value to judge uniqueness by. If accessor is a string instead of a function, judges uniqueness by the property named by accessor on each of the objects.
	@param {Boolean} [transform=true] If true, return the transformed value from accessor.
	@returns {Array}
*/
/* --------------------------------------------
 *
 *
 *
 *
 * --------------------------------------------
 */
export default function uniques (list, iteratee, transform = true) {
	if (!Array.isArray(list)) {
		console.error('LayerCake error: Input value to `uniques` must be a list.');
		return null;
	}
	const ll = list.length;
	const iterater = typeof iteratee === 'function';
	const key = typeof iteratee !== 'undefined';
	const seen = new Set();
	const result = [];
	for (let i = 0; i < ll; i += 1) {
		const d = list[i];
		const computed = iterater ? iteratee(d) : key === true ? d[iteratee] : d;
		if (!seen.has(computed)) {
			seen.add(computed);
			result.push(transform ? computed : d);
		}
	}
	return result;
}
