<!--
	@component
	HTML layout component
 -->
<script>
	import { getContext } from 'svelte';

	/** @type {Element} [element] The layer's outermost `<div>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {Object} [attrs] An object that sets additional attribute values onto the `<div>` tag*/
		export let attrs = {};

	$: if (element) {
		Object.entries(attrs).forEach(d => element.setAttribute(...d));
	}

	const { padding } = getContext('LayerCake');
</script>

<div
	bind:this={element}
	class="layercake-layout-html"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={$padding.top + 'px'}
	style:right={$padding.right + 'px'}
	style:bottom={$padding.bottom + 'px'}
	style:left={$padding.left + 'px'}
>
	<slot {element}></slot>
</div>

<style>
	div,
	slot {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
