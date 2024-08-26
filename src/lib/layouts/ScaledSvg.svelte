<!--
	@component
	Scaled SVG layout component
 -->
<script>
	import { getContext } from 'svelte';

	const { padding } = getContext('LayerCake');

	/** @type {Element|undefined} [element] The layer's `<svg>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {number|undefined} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {number} [fixedAspectRatio=1] A number to set the aspect ratio onto the viewBox. */
	export let fixedAspectRatio = 1;

	/** @type {String} [viewBox=`0 0 100 ${100 / fixedAspectRatio}`] A string passed to the `viewBox` property on the `<svg>` tag. */
	export let viewBox = `0 0 100 ${100 / fixedAspectRatio}`;
	$: viewBox = `0 0 100 ${100 / fixedAspectRatio}`;

	/** @type {String|undefined} [label] A string passed to the `aria-label` on the `<svg>` tag. */
	export let label = undefined;

	/** @type {String|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<svg>` tag. */
	export let labelledBy = undefined;

	/** @type {String|undefined} [describedBy] A string passed to `aria-describedby` property on the `<svg>` tag. */
	export let describedBy = undefined;

	/** @type {String|undefined} [title] Shorthand to set the contents of `<title></title>` for accessibility. You can also set arbitrary HTML via the "title" slot but this is a convenient shorthand. If you use the "title" slot, this prop is ignored. */
	export let title = undefined;
</script>

<svg
	bind:this={element}
	{viewBox}
	preserveAspectRatio="none"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={$padding.top + 'px'}
	style:left={$padding.left + 'px'}
	style:width={`calc(100% - ${$padding.left + $padding.right}px)`}
	style:height={`calc(100% - ${$padding.top + $padding.bottom}px)`}
	style="right:0px; bottom:0px;"
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

	<slot {element}></slot>
</svg>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	svg :global(*) {
		vector-effect: non-scaling-stroke;
	}
</style>
