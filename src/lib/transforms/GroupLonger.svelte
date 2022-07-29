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
	/** @type {Array} [groups] - The series names to break out. */
	export let groups;
	/** @type {String[]} [xKey] The name of the xKey. */
	export let keepKeys = [];
	/** @type {String} [yKey] The name of the yKey. */
	export let valuesTo = undefined;
	/** @type {String} [zKey] The name of the zKey. */
	export let groupsTo = undefined;

	$: dataLong = groups.map(key => {
			return {
				[groupsTo]: key,
				values: data.map(d => {
					return {
						...Object.fromEntries(keepKeys.map((k => [k, d[k]]))),
						[valuesTo]: d[key],
						[groupsTo]: key,
					};
				})
			};
		});
</script>

<slot seriesData={dataLong}/>
