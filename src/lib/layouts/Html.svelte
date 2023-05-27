<!--
	@component
	HTML layout component
 -->
<script>
	import { getContext } from 'svelte';

	const { padding } = getContext('LayerCake');

	/** @type {Element} [element] The layer's outermost `<div>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {String} [label] A string passed to the `aria-label` on the `<div>` tag. */
	export let label = undefined;

	/** @type {String} [labelledBy] A string passed to the `aria-labelledby` on the `<div>` tag. */
	export let labelledBy = undefined;

	/** @type {String} [describedBy] A string passed to `aria-describedby` property on the `<div>` tag. */
	export let describedBy = undefined;
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
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
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
