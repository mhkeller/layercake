/* eslint-disable no-nested-ternary */
export default {
	x: (width, height, reverse, range) => {
		return reverse
			? [width, 0]
			: typeof range === 'function'
				? range({ width, height })
				: (range || [0, width]);
	},
	y: (width, height, reverse, range) => {
		return reverse
			? [height, 0]
			: typeof range === 'function'
				? range({ width, height })
				: (range || [0, height]);
	},
	r: (width, height, reverse, range) => {
		return !range
			? reverse ? [25, 1] : [1, 25]
			: typeof range === 'function'
				? range({ width, height })
				: range;
	}
};
