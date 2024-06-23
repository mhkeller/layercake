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

	/** @type {String} [role] A string passed to the `aria-role` on the `<div>` tag. This is `undefined` by default but will be set by default to `'figure'` if `label`, `labelledby` or `describedby` is set. That default will be overridden by whatever is passed in. */
	export let role = undefined;

	/** @type {String} [label] A string passed to the `aria-label` on the `<div>` tag. */
	export let label = undefined;

	/** @type {String} [labelledBy] A string passed to the `aria-labelledby` on the `<div>` tag. */
	export let labelledBy = undefined;

	/** @type {String} [describedBy] A string passed to `aria-describedby` property on the `<div>` tag. */
	export let describedBy = undefined;

	$: roleVal = role || (label || labelledBy || describedBy ? 'figure' : undefined);
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
	role={roleVal}
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
>
	<slot {element}></slot>
</div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
