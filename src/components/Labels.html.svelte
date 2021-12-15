<script>
	/**
		Adds HTML text labels based on a given list.
		@type {List} labels – An array of objects that contain a field containing text label and data fields.
		@type {String} [stroke=''] – The shape's stroke color.
		@type {Number} [strokeWidth=0] – The shape's stroke width.
	*/
  import { getContext } from 'svelte';

  const { xGet, yGet, custom } = getContext('LayerCake');

  export let labels;
  export let formatName = d => d;
</script>

{#each labels as d}
	<div
    class="label"
    style="
      top:{$yGet(d)}px;
      left:{$xGet(d)}px;
    "
  >{formatName($custom.getLabelName(d))}</div>
{/each}

<style>
	.label {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 12px;
	}
</style>
