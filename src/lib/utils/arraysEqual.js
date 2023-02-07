/* --------------------------------------------
 *
 * Determine whether two arrays equal one another, order not important
 * --------------------------------------------
 */
// TODO test this
export default function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	return arr1.every(k => {
		return arr2.includes(k);
	});
}
