/**
  Bins and counts your data.
	A wrapper around [d3-array#bin](https://github.com/d3/d3-array#bin)

	// Input data
	const data = [
		{ myX: 0 },
		{ myX: 1 },
		{ myX: 2 },
		{ myX: 4 },
		{ myX: 2 },
		{ myX: 8 },
		{ myX: 1 },
		{ myX: 4 },
		{ myX: 7 }
	];

	// Usage
	bin(data, 'myX');
	// or...
	bin(data, d => d.myX);

	// Output data
	(taken from the d3-array docs): an array of bins, where each bin is an array containing the associated elements from the input data. Thus, the length of the bin is the number of elements in that bin. Each bin has two additional attributes:

	x0 - the lower bound of the bin (inclusive).
	x1 - the upper bound of the bin (exclusive, except for the last bin).

	[
		[ { myX: 0 }, { myX: 1 }, { myX: 1 }, x0: 0, x1: 2 ],
		[ { myX: 2 }, { myX: 2 }, x0: 2, x1: 4 ],
		[ { myX: 4 }, { myX: 4 }, x0: 4, x1: 6 ],
		[ { myX: 7 }, x0: 6, x1: 8 ],
		[ { myX: 8 }, x0: 8, x1: 10 ]
	]

	@param {Array} data The data to be binned.
	@param {string|number|Function} [value] Optional. An accessor function passed to `bin.value()`. Defaults to an identity function. If this is a string or number, it will be transformed into an accessor for that key.
	@param {Object} options Options object
	@param {Array} [options.domain] Optional. The domain passed to `bin.domain()`. Pass in your own domain if you'd like, otherwise computed automatically.
	@param {number|Array|Function} [options.thresholds] Optional. The thresholds passed to `bin.thresholds()`, otherwise computed automatically.
	@returns {Array} binData An array of bin arrays
*/
import { bin as d3Bin } from 'd3-array';

export default function bin(data, value, { domain, thresholds } = {}) {
	if (typeof data !== 'object') {
		throw new TypeError('The first argument of bin() must be an array or data object');
	}
	let hist = d3Bin();

	if (value) {
		const acc = typeof value === 'function' ? value : d => d[value];
		hist = hist.value(acc);
	}
	if (domain) {
		hist = hist.domain(domain);
	}
	if (thresholds) {
		hist = hist.thresholds(thresholds);
	}

	return hist(data);
}
