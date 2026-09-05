<!--
	@component
	Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `z` field accessor to pull the text label.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { max } from 'd3-array';

	const c = getLayerCakeContext();

	/* --------------------------------------------
	 * Title case the first letter
	 */
	const cap = val => val.replace(/^\w/, d => d.toUpperCase());

	/* --------------------------------------------
	 * Put the label on the highest value
	 */
	let left = $derived(values => c.xScale(max(values, c.x)) / Math.max(...c.xRange));
	let top = $derived(values => c.yScale(max(values, c.y)) / Math.max(...c.yRange));
</script>

{#each c.data as group}
	<div
		class="label"
		style="
      top:{top(group.values) * 100}%;
      left:{left(group.values) * 100}%;
    "
	>
		{cap(c.z(group))}
	</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%) translateY(1px);
		font-size: 13px;
	}
</style>
