<!--
  @component
  Stack your data with `.stack()` from d3-shape
	for stacked bar or area charts
	A wrapper around [d3-shape.stack](https://github.com/d3/d3-shape#stack)
	Returns as slot props:
		* {Array} [stackData] An array of stacked data arrays
 -->
<script>
  import { stack } from 'd3-shape';

	/** @type {Array} [data] The data to be stacked. */
	export let data;
	/** @type {Array|Function} [keys] The series names to stack, passed to `stack.keys()`. */
	export let keys;
	/** @type {String|Number|Function} [value] An accessor function passed to `stack.value()`. If this is a string or number, it will be transformed into an accessor for that key. */
	export let value = undefined;
	/** @type {Array|Function} [order] The stack order passed to `stack.order()`. */
	export let order = undefined;
	/** @type {Function} [offset] The offset function passed to `stack.offset()`. */
	export let offset = undefined;

	$: stacker = stack()
    .keys(keys);

	$: if (value) {
		// @ts-ignore
		const acc = typeof value === 'function' ? value : d => d[value];
		stacker = stacker.value(acc);
	}
	$: if (order) {
		stacker = stacker.order(order);
	}
	$: if (offset) {
		stacker = stacker.offset(offset);
	}
</script>

<slot
	stackData={stacker(data)}
/>
