/**
 * Sort comparator function
 * Sort numbers, strings and dates properly in ascending order
 *
 * @param {Object} a - First object to compare
 * @param {Object} b - Second object to compare
 * @returns {Number} -1, 0, or 1
 */
export default function sorter (a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}
