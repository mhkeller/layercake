/**
 * Create a function that runs a datum through a dimension's accessor
 * and its scale. Array-valued accessors map over the scale.
 * @param {Function} acc The dimension's accessor function.
 * @param {Function} scale The dimension's scale.
 * @returns {(d: any, i?: number) => any} The getter.
 */
export default function createGetter(acc, scale) {
	return (d, i) => {
		const val = acc(d, i);
		if (Array.isArray(val)) {
			return val.map(v => scale(v));
		}
		return scale(val);
	};
}
