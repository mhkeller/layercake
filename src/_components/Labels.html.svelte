<!--
	@component
	Adds HTML text labels based on a given list.
 -->
<script>
	import { getContext } from 'svelte';

	const { xGet, yGet } = getContext('LayerCake');

	

	

	
	/**
	 * @typedef {Object} Props
	 * @property {Array<Object>} labels - An array of objects that contain a field containing text label and data fields.
	 * @property {Function} getLabelName - An accessor function to return the label field on your objects in the `labels` array.
	 * @property {Function} [formatLabelName] - An optional formatting function.
	 */

	/** @type {Props} */
	let { labels, getLabelName, formatLabelName = d => d } = $props();
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
