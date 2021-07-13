/* --------------------------------------------
 *
 * Create a function that calculates the minimum or maximum
 * value of array arr, if `which` is `'min'` or `'max'`
 * Returns the minimum or maximum value or all non-undefined,
 * non-null, non-NaN values in the array;
 * if no such value exists, null is returned.
 *
 * --------------------------------------------
 */
export default function minMix(which) {
	if (which !== 'min' && which !== 'max') {
		throw new TypeError('Argument must be either \'min\' or \'max\'.');
	}
	return function minMaxFn(arr) {
		let result = null;
		for (let i = 0; i < arr.length; i += 1) {
			const val = arr[i];
			if (
				val !== null
				&& !Number.isNaN(val)
				&& typeof val !== 'undefined'
			) {
				if (which === 'max') {
					result = result === null || val > result ? val : result;
				} else if (which === 'min') {
					result = result === null || val < result ? val : result;
				}
			}
		}
		return result;
	};
}
