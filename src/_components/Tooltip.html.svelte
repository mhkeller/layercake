<!--
	@component
	Generates a hover tooltip. It creates a slot with an exposed variable via `let:detail` that contains information about the event. Use the slot to populate the body of the tooltip using the exposed variable `detail`.
 -->
<script>
	/**
	 * @typedef {Object} Props
	 * @property {Object} evt - A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`.
	 * @property {Number} [offset] - A y-offset from the hover point, in pixels.
	 * @property {import('svelte').Snippet<[any]>} [children]
	 */

	/** @type {Props} */
	let { evt, offset = -35, children } = $props();
</script>

{#if evt.detail}
	<div
		class="tooltip"
		style="
      top:{evt.detail.e.layerY + offset}px;
      left:{evt.detail.e.layerX}px;
    "
	>
		{@render children?.({ detail: evt.detail })}
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
