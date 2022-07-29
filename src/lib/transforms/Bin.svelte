<!--
  @component
  Bins and counts your data.
	A wrapper around [d3-array#bin](https://github.com/d3/d3-array#bin)
	Returns as slot props:
		* {Array} [bins] An array of bin arrays. See [d3-array#bin](https://github.com/d3/d3-array#bin) for details
		* {Array} [extents=[min, max]] The calculated extents of the `data` and the provided `value` accessor
 -->
 <script>
	import { extent, bin } from 'd3-array';

	/** @type {Array} [data] The data to be binned. */
	export let data;
	/** @type {Function} [faclue=d => d] An accessor function passed to `bin.value()`. Defaults to an identity function. */
	export let value = d => d;
	/** @type {Array} [domain=[dataMin, dataMax]] The domain passed to `bin.domain()`. If not set here as a prop, defaults to the min and max of the `data` and the `value` accessor. Pass in your own domain if you'd like. */
	export let domain;
	/** @type {Array} [thresholds] The thresholds passed to `bin.thresholds()` */
	export let thresholds;

	$: domainValue = domain || extent(data, value);

	$: hist = bin()
	  .value(value)
	  .domain(domainValue)
	  .thresholds(thresholds);
</script>

<slot
	bins={hist(data)}
	extents={domainValue}
/>
