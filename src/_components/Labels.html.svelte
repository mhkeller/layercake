<!--
	@component
	Adds HTML text labels based on a given list.
 -->
<script>
	import { getContext } from 'svelte';

	const { xGet, yGet } = getContext('LayerCake');

	/** @type {Array} labels - An array of objects that contain a field containing text label and data fields. */
	export let labels;

	/** @type {Function} getLabelName= - An accessor function to return the label field on your objects in the `labels` array. */
	export let getLabelName;

	/** @type {Function} [formatLabelName=d => d] - An optional formatting function. */
	export let formatLabelName = d => d;
</script>

{#each labels as d}
	<div
		class="label"
		style="
      top:{$yGet(d)}px;
      left:{$xGet(d)}px;
    "
	>
		{formatLabelName(getLabelName(d))}
	</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 12px;
	}
</style>
