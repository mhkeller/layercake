/* eslint-disable no-nested-ternary */
function calcBaseRange(s, width, height, reverse, percentScale) {
	let min;
	let max;
	if (percentScale === true) {
		min = 0;
		max = 100;
	} else {
		min = s === 'r' ? 1 : 0;
		max = s === 'y' ? height : s === 'r' ? 25 : width;
	}
	return reverse === true ? [max, min] : [min, max];
}

export default function getDefaultRange(s, width, height, reverse, range, percentScale) {
	return !range
		? calcBaseRange(s, width, height, reverse, percentScale)
		: typeof range === 'function'
			? range({ width, height })
			: range;
}
