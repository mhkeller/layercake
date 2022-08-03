<!--
  @component
  Pivots your data by "lengthening" it - increasing the number
	of rows and decreasing the number of columns.
	Similar to R's tidyverse [pivot_longer function](https://tidyr.tidyverse.org/reference/pivot_longer.html)
		* {Array} [seriesData] The transformed data that is a list for each group with `key` and `values` fields where `values` is a list of transformed data.
	[{
		key: 'group-one',
		values: [
			{ month: '2010-01-01', value: 23 },
			{ month: '2010-01-02', value: 71 },
			// ...
		]
	},
	// etc...]
 -->
 <script>
	/** @type {Array} [data] The data to be transformed. */
	export let data;
	/** @type {Array} [seriesNames] The series names to break out into separate groups. */
	export let seriesNames;
	/** @type {String} [seriesTo] This name of the field that is added to each group object. Defaults to 'group'. This field is also added to each row of data. */
	export let seriesTo = 'series';
	/** @type {String} [valueTo] The name of the new field on each row of data to store the value under. Defaults to 'value'. */
	export let valueTo = 'value';
	/** @type {String[]} [keepKeys] Any keys we want to explicitly keep. If this is unset, all keys not specified in your groups will be kept. The list of full keys is determined by naively looking at the first row of the data. */
	export let keepKeys = undefined;

	$: seriesNamesSet = new Set(seriesNames);
	$: keep = keepKeys || Object.keys(data[0]).filter(d => !seriesNamesSet.has(d));

	$: dataLong = seriesNames.map(key => {
			return {
				[seriesTo]: key,
				values: data.map(d => {
					return {
						...Object.fromEntries(keep.map((k => [k, d[k]]))),
						[valueTo]: d[key],
						[seriesTo]: key,
					};
				})
			};
		});
</script>

<slot seriesData={dataLong}/>
