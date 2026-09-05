<!--
	@component
	Adds HTML text labels at the x and y position of each item in a list.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {Array<Object>} labels - The items to label. Each one is run through the chart's x and y accessors for its position.
	 * @property {(d: any) => string} getLabel - Returns the label text for an item.
	 * @property {(d: any) => string} [format=d => d] - Formats the label text.
	 */

	/** @type {Props} */
	let { labels, getLabel, format = d => d } = $props();
</script>

{#each labels as d}
	<div
		class="label"
		style="
      top:{k.yGet(d)}px;
      left:{k.xGet(d)}px;
    "
	>
		{format(getLabel(d))}
	</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 12px;
	}
</style>
