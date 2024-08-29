/**
  Determine whether two arrays equal one another, order not important.
	This uses includes instead of converting to a set because this is only
	used internally on a small array size and it's not worth the cost
	of making a set
	@param {Array<any>} arr1 An array to test
	@param {Array<any>} arr2 An array to test against
	@returns {boolean} Whether they contain all and only the same items
 */
export default function arraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	return arr1.every(k => {
		return arr2.includes(k);
	});
}
