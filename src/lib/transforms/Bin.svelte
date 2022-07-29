<!--
  @component
  Bins and counts your data.
	A wrapper around [d3-array#bin](https://github.com/d3/d3-array#bin)
	Returns as slot props:
		* {Array} [bins] An array of bin arrays. See [d3-array#bin](https://github.com/d3/d3-array#bin) for details
		* {Array} [extents=[min, max]] The calculated extents of the `data` and the provided `value` accessor
 -->
 <script>
	import { bin } from 'd3-array';

	/** @type {Array} [data] The data to be binned. */
	export let data;
	/** @type {String|Function} [value] An accessor function passed to `bin.value()`. Can also be a string. */
	export let value = undefined;
	/** @type {Array} [domain] The domain passed to `bin.domain()`. Pass in your own domain if you'd like. */
	export let domain = undefined;
	/** @type {Array|Number} [thresholds] The thresholds passed to `bin.thresholds()` */
	export let thresholds = undefined;

	$: hist = bin();

	$: if (value) {
		// @ts-ignore
		const acc = typeof value === 'string' ? d => d[value] : value;
		hist = hist.value(acc);
	}
	$: if (domain) {
		hist = hist.domain(domain)
	}
	$: if (thresholds) {
		hist = hist.thresholds(thresholds);
	}
</script>

<slot
	binData={hist(data)}
/>
