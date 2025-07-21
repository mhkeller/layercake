/**
 * Calculate the base range for a given scale.
 * This function determines the default range based on the scale type,
 * width, height, and whether the scale is reversed or uses a percentage range.
 * @param {string} s The scale type ('x', 'y', or 'r').
 * @param {number} width The width of the chart.
 * @param {number} height The height of the chart.
 * @param {boolean} reverse Whether the scale should be reversed.
 * @param {boolean} percentRange Whether to use a percentage range.
 * @returns {[number, number]} The base range for the scale.
 */
function calcBaseRange(s, width, height, reverse, percentRange) {
	let min;
	let max;
	if (percentRange === true) {
		min = 0;
		max = 100;
	} else {
		min = s === 'r' ? 1 : 0;
		max = s === 'y' ? height : s === 'r' ? 25 : width;
	}
	return reverse === true ? [max, min] : [min, max];
}

/**
 * Get the default range for a given scale.
 * @param {string} s The scale type ('x', 'y', or 'r').
 * @param {number} width The width of the chart.
 * @param {number} height The height of the chart.
 * @param {boolean} reverse Whether the scale should be reversed.
 * @param {Array<number>|((params: {width: number, height: number}) => Array<number>)|undefined|null} range The range to use, or a function that returns a range.
 * @param {boolean} percentRange Whether to use a percentage range.
 * @returns {Array<number>} The default range for the scale.
 */
export default function getDefaultRange(s, width, height, reverse, range, percentRange) {
	return !range
		? calcBaseRange(s, width, height, reverse, percentRange)
		: typeof range === 'function'
			? range({ width, height })
			: range;
}
