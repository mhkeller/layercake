/**
  Pivots your data by "lengthening" it - increasing the number
  of rows and decreasing the number of columns.
  Similar to R's tidyverse [pivot_longer function](https://tidyr.tidyverse.org/reference/pivot_longer.html)

  // Input data
  const data = [
		{ month: '2015-01-01', apples: 320, bananas: 480, cherries: 640, dates: 400 },
		{ month: '2015-02-01', apples: 640, bananas: 960, cherries: 640, dates: 500 },
    { month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 960, dates: 600 }
  ];

	// Usage
	groupLonger(data, ['apples', 'bananas', 'cherries', 'dates']);

  // Output
  [{
  	group: 'apples',
  	values: [
  		{ month: '2010-01-01', value: 320 },
  		{ month: '2010-02-01', value: 640 },
  		// ...
  	]
  },
  // etc...
  ]
  --------------------------------------------

	@param {Array} data The data to be transformed.
	@param {Array} keys The groups names to break out into separate groups.
	@param {Object} options Options object
	@param {string} [options.groupTo='group'] This name of the field that is added to each group object. Defaults to 'group'. This field is also added to each row of data.
	@param {string} [options.valueTo='value'] The name of the new field on each row of data to store the value under. Defaults to 'value'.
	@param {string[]} [options.keepKeys] Any keys we want to explicitly keep. If this is unset, all keys not specified in your groups will be kept. The list of full keys is determined by naively looking at the first row of the data.

	@returns {Array} [dataLong] The transformed data that is a list of one object for each group. Each object has `key` and `values` where `key` is the group name and `values` is a list of transformed data.
*/

export default function groupLonger(
	data,
	keys,
	{ groupTo = 'group', valueTo = 'value', keepKeys = undefined } = {}
) {
	if (!Array.isArray(data)) {
		throw new TypeError('The first argument of groupLonger() must be an array of data');
	}
	if (!Array.isArray(keys)) {
		throw new TypeError('The second argument of groupLonger() must be an array of key names');
	}
	const keysSet = new Set(keys);
	const keep = keepKeys || Object.keys(data[0]).filter(d => !keysSet.has(d));

	return keys.map(key => {
		return {
			[groupTo]: key,
			values: data.map(d => {
				return {
					...Object.fromEntries(keep.map(k => [k, d[k]])),
					[valueTo]: d[key],
					[groupTo]: key
				};
			})
		};
	});
}
