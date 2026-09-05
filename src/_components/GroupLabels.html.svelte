<!--
	@component
	Generates one HTML text label per group of a nested dataset. Each label sits at the group's largest x and largest y value, which on a multi-series line chart is just past the end of the line. The data must be an array of groups, each with a `values` array of rows. The label text comes from the `c` accessor.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { max } from 'd3-array';

	const k = getLayerCakeContext();

	/** @param {string} val */
	const capitalizeFirst = val => val.replace(/^\w/, d => d.toUpperCase());

	// The group's largest x and y values, as a share of the chart
	/** @param {Array<any>} values */
	function leftPercent(values) {
		return (k.xScale(max(values, k.x)) / Math.max(...k.xRange)) * 100;
	}
	/** @param {Array<any>} values */
	function topPercent(values) {
		return (k.yScale(max(values, k.y)) / Math.max(...k.yRange)) * 100;
	}
</script>

{#each k.data as group}
	<div
		class="label"
		style="
      top:{topPercent(group.values)}%;
      left:{leftPercent(group.values)}%;
    "
	>
		{capitalizeFirst(k.c?.(group) ?? '')}
	</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-100%, -100%) translateY(1px);
		font-size: 13px;
	}
</style>
