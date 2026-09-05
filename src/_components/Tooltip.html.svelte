<!--
	@component
	Generates a hover tooltip positioned at the mouse event you pass in. Put whatever you want inside it. The parent component has the hovered data, so it decides what to show.
 -->
<script>
	/**
	 * @typedef {Object} Props
	 * @property {MouseEvent} event - The mouse event that triggered the tooltip.
	 * @property {number} [offset=-35] - A y-offset from the hover point, in pixels.
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { event, offset = -35, children } = $props();
</script>

{#if event.layerX !== undefined && event.layerY !== undefined}
	<div
		class="tooltip"
		style="
      top:{event.layerY + offset}px;
      left:{event.layerX}px;
    "
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		width: 150px;
		border: 1px solid #ccc;
		font-size: 13px;
		background: rgba(255, 255, 255, 0.85);
		transform: translate(-50%, -100%);
		padding: 5px;
		z-index: 15;
	}
</style>
