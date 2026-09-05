<!--
	@component
	SVG layout component
 -->
<script>
	import { getLayerCakeContext } from '../context.js';

	/**
	 * @typedef {Object} Props
	 * @property {SVGElement|undefined} [element] The layout's `<svg>` element. A useful prop to bind to.
	 * @property {number|undefined} [zIndex] Set the layout's z-index.
	 * @property {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on all of this layout's layers.
	 * @property {string|undefined} [viewBox] Set a custom viewBox.
	 * @property {string|undefined} [label] A string passed to the `aria-label` on the `<svg>` element.
	 * @property {string|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<svg>` element.
	 * @property {string|undefined} [describedBy] A string passed to `aria-describedby` property on the `<svg>` element.
	 * @property {string|undefined} [role] A string passed to the `role` on the `<svg>` element. This is `undefined` by default but will be set by default to `'img'` if `label`, `labelledBy` or `describedBy` is set. That default will be overridden by whatever is passed in.
	 * @property {string|undefined} [titleText] Shorthand to set the contents of `<title></title>` for accessibility. You can also set arbitrary HTML via the "title" slot but this is a convenient shorthand. If you use the "title" slot, this prop is ignored.
	 * @property {'visible'|'hidden'} [overflow='visible'] Set the overflow property on the `<svg>` element. Defaults to `'visible'`.
	 * @property {import('svelte').Snippet} [title] A snippet to render inside the `<title>` tag for accessibility. If you use this, the `titleText` prop is ignored.
	 * @property {import('svelte').Snippet} [defs] A snippet to render inside the `<defs>` tag for accessibility.
	 * @property {import('svelte').Snippet<[{ element: SVGElement | undefined }]>} [children]
	 */

	/** @type {Props} */
	let {
		element = $bindable(undefined),
		zIndex = undefined,
		pointerEvents = undefined,
		viewBox = undefined,
		label = undefined,
		labelledBy = undefined,
		describedBy = undefined,
		role = undefined,
		titleText = undefined,
		title = undefined,
		defs = undefined,
		overflow = 'visible',
		children
	} = $props();

	const k = getLayerCakeContext();

	// A labelled graphic should announce itself as one – same pattern as
	// the Html layout's derived 'figure' role
	let roleVal = $derived(role || (label || labelledBy || describedBy ? 'img' : undefined));
</script>

<svg
	bind:this={element}
	class="layercake-layout-svg"
	{viewBox}
	width={k.containerWidth}
	height={k.containerHeight}
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={k.padding.top + 'px'}
	style:left={k.padding.left + 'px'}
	style:width={`calc(100% - ${k.padding.left + k.padding.right}px)`}
	style:height={`calc(100% - ${k.padding.top + k.padding.bottom}px)`}
	style:overflow
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
	role={roleVal}
>
	{#if typeof title === 'function'}<title>{@render title()}</title>{:else if titleText}<title
			>{titleText}</title
		>{/if}

	{#if typeof defs === 'function'}
		<defs>
			{@render defs()}
		</defs>
	{/if}
	{@render children?.({ element })}
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	}
</style>
