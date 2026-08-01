<!--
	@component
	HTML layout component
 -->
<script>
	import { getLayerCakeContext } from '../context.js';

	const c = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {HTMLElement|undefined} [element] The layout's outermost `<div>` element. A useful prop to bind to.
	 * @property {number|undefined} [zIndex] Set the layout's z-index.
	 * @property {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on all of this layout's layers.
	 * @property {string|undefined} [role] A string passed to the `aria-role` on the `<div>` element. This is `undefined` by default but will be set by default to `'figure'` if `label`, `labelledby` or `describedby` is set. That default will be overridden by whatever is passed in.
	 * @property {string|undefined} [label] A string passed to the `aria-label` on the `<div>` element.
	 * @property {string|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<div>` element.
	 * @property {string|undefined} [describedBy] A string passed to `aria-describedby` property on the `<div>` element.
	 * @property {'visible'|'hidden'} [overflow='visible'] Set the overflow property on the `<div>` element. Defaults to `'visible'`.
	 * @property {import('svelte').Snippet<[{ element: HTMLElement | undefined }]>} [children]
	 */

	/** @type {Props} */
	let {
		element = $bindable(undefined),
		zIndex = undefined,
		pointerEvents = undefined,
		role = undefined,
		label = undefined,
		labelledBy = undefined,
		describedBy = undefined,
		overflow = 'visible',
		children
	} = $props();

	let roleVal = $derived(role || (label || labelledBy || describedBy ? 'figure' : undefined));
</script>

<div
	bind:this={element}
	class="layercake-layout-html"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={c.padding.top + 'px'}
	style:right={c.padding.right + 'px'}
	style:bottom={c.padding.bottom + 'px'}
	style:left={c.padding.left + 'px'}
	role={roleVal}
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
	style:overflow
>
	{@render children?.({ element })}
</div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
