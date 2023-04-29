<!--
	@component
	Scaled SVG layout component
 -->
<script>
	import { getContext } from 'svelte';

	const { padding } = getContext('LayerCake');

	/** @type {Element} [element] The layer's `<svg>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {Number} [fixedAspectRatio=1`] A number to set the aspect ratio onto the viewBox. */
	export let fixedAspectRatio = 1;

	/** @type {String} [viewBox=`0 0 100 ${100 / fixedAspectRatio}`] A string passed to the `viewBox` property on the `<svg>` tag. */
	export let viewBox = `0 0 100 ${100 / fixedAspectRatio}`;
	$: viewBox = `0 0 100 ${100 / fixedAspectRatio}`;

	/** @type {String} [label] A string passed to the `aria-label` on the `<svg>` tag. */
	export let label = undefined;

	/** @type {String} [labelledBy] A string passed to the `aria-labelledby` on the `<svg>` tag. */
	export let labelledBy = undefined;

	/** @type {String} [role] A string passed to the `role` on the `<svg>` tag. */
	export let role = undefined;

	/** @type {Number} [tabindex] A number passed to the `tabindex` on the `<svg>` tag. */
	export let tabindex = undefined;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<svg
	bind:this={element}
	{viewBox}
	preserveAspectRatio="none"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={$padding.top + 'px'}
	style:left={$padding.left + 'px'}
	style:width={`calc(100% - ${($padding.left + $padding.right)}px)`}
	style:height={`calc(100% - ${($padding.top + $padding.bottom)}px)`}
	style="right:0px; bottom:0px;"
	aria-label={label}
	aria-labelledby={labelledBy}
	{role}
	{tabindex}
>
	<slot name="title"></slot>

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
