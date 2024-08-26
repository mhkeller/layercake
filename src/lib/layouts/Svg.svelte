<!--
	@component
	SVG layout component
 -->
<script>
	import { getContext } from 'svelte';

	/** @type {Element|undefined} [element] The layer's `<svg>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Element|undefined} [innerElement] The layer's `<g>` tag. Useful for bindings. */
	export let innerElement = undefined;

	/** @type {Number|undefined} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {String|undefined} [viewBox] A string passed to the `viewBox` property on the `<svg>` tag. */
	export let viewBox = undefined;

	/** @type {String|undefined} [label] A string passed to the `aria-label` property on the `<svg>` tag. */
	export let label = undefined;

	/** @type {String|undefined} [labelledBy] A string passed to the `aria-labelledby property` on the `<svg>` tag. */
	export let labelledBy = undefined;

	/** @type {String|undefined} [describedBy] A string passed to the `aria-describedby` property on the `<svg>` tag. */
	export let describedBy = undefined;

	/** @type {String|undefined} [title] Shorthand to set the contents of `<title></title>` for accessibility. You can also set arbitrary HTML via the "title" slot but this is a convenient shorthand. If you use the "title" slot, this prop is ignored. */
	export let title = undefined;

	const { containerWidth, containerHeight, padding } = getContext('LayerCake');
</script>

<svg
	bind:this={element}
	class="layercake-layout-svg"
	{viewBox}
	width={$containerWidth}
	height={$containerHeight}
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
>
	<slot name="title"
		>{#if title}<title>{title}</title>{/if}</slot
	>

	<defs>
		<slot name="defs"></slot>
	</defs>
	<g
		bind:this={innerElement}
		class="layercake-layout-svg_g"
		transform="translate({$padding.left}, {$padding.top})"
	>
		<slot {element}></slot>
	</g>
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	}
</style>
