/* eslint-disable no-nested-ternary */
function calcBaseRange(s, width, height, reverse) {
	const config = {
		x: reverse === true ? [width, 0] : [0, width],
		y: reverse === true ? [height, 0] : [0, height],
		z: reverse === true ? [width, 0] : [0, width],
		r: reverse === true ? [25, 1] : [1, 25],
	};
	return config[s];
}

export default function getDefaultRange(s, width, height, reverse, range) {
	return !range
		? calcBaseRange(s, width, height, reverse)
		: typeof range === 'function'
			? range({ width, height })
			: range;
}
