<!--
	@component
	Generates HTML text labels for a nested data structure. It places the label near the y-value of the highest x-valued data point. This is useful for labeling the final point in a multi-series line chart, for example. It expects your data to be an array of objects where each has `values` field that is an array of data objects. It uses the `c` field accessor to pull the text label.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { max } from 'd3-array';

	const k = getLayerCakeContext();

	// Title case the first letter
	const cap = val => val.replace(/^\w/, d => d.toUpperCase());

	// Put the label on the highest value
	let left = $derived(values => k.xScale(max(values, k.x)) / Math.max(...k.xRange));
	let top = $derived(values => k.yScale(max(values, k.y)) / Math.max(...k.yRange));
</script>

{#each k.data as group}
	<div
		class="label"
		style="
      top:{top(group.values) * 100}%;
      left:{left(group.values) * 100}%;
    "
	>
		{cap(k.c(group))}
	</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%) translateY(1px);
		font-size: 13px;
	}
</style>
