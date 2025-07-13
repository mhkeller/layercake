import { stack as d3Stack } from 'd3-shape';

/**
	Stack your data with `.stack()` from d3 - shape for stacked bar or area charts
	A wrapper around [d3-shape.stack](https://github.com/d3/d3-shape#stack)

	// Input data
	const data = [
    {month: '2015-01-01', apples: 320,  bananas: 480,  cherries: 640, dates: 400}
    {month: '2015-02-01', apples: 640,  bananas: 960,  cherries: 740, dates: 500},
    {month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 920, dates: 600},
    {month: '2015-04-01', apples: 3840, bananas: 1920, cherries: 960, dates: 700},
  ];

	// Usage
	stack(data, ['apples', 'bananas', 'cherries', 'dates'])

	// Output data
	stackData equals an array of values. The `month` values you can't see because sneakily stashes them as a property on the array, accessible as `d.data`.
  [
		[ [   0, 320],  [   0,  640], [   0, 1600], [   0, 3840] ], // apples
		[ [ 320, 800],  [ 640, 1600], [1600, 3040], [3840, 5760] ], // bananas
		[ [ 800, 1440], [1600, 2340], [3040, 3960], [5760, 6720] ], // cherries
		[ [1440, 1840], [2340, 2840], [3960, 4560], [6720, 7420] ]  // dates
	]

	@param {Array<any>} data The data to be stacked.
	@param {Array<string>|Function} keys The group names to stack, passed to `stack.keys()`.
	@param {Object} options Options object
	@param {string|number|Function} [options.value] An accessor function passed to `stack.value()`. If this is a string or number, it will be transformed into an accessor for that key.
	@param {Array<any>|Function} [options.order] The stack order passed to `stack.order()`.
	@param {Function} [options.offset] The offset function passed to `stack.offset()`.

	@returns {Array<any>} stackedData The transformed data
 */
export default function stack(data, keys, { value, order, offset } = {}) {
	if (typeof data !== 'object') {
		throw new TypeError('The first argument of stack() must be an array or data object');
	}
	if (!Array.isArray(keys)) {
		throw new TypeError('The second argument of stack() must be an array of key names');
	}
	let stacker = d3Stack().keys(keys);

	if (typeof value !== 'undefined' && value !== null) {
		if (typeof value === 'string') {
			stacker = stacker.value(/** @param {any} d */ d => d[value]);
		} else if (typeof value === 'number') {
			stacker = stacker.value(value);
		} else if (typeof value === 'function') {
			stacker = stacker.value(
				/** @type {(d: any, key: string, i: number, data: any[]) => number} */ (value)
			);
		}
	}
	if (order) {
		stacker = stacker.order(/** @type {any} */ (order));
	}
	if (offset) {
		stacker = stacker.offset(/** @type {any} */ (offset));
	}

	return stacker(data);
}
