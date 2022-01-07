<!--
	@component
	Scaled SVG layout component
 -->
<script>
	import { getContext } from 'svelte';

	/** @type {Element} [element] The layer's `<svg>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {Number} [fixedAspectRatio=1`] A number to set the aspect ratio onto the viewBox. */
	export let fixedAspectRatio = 1;

	/** @type {String} [viewBox=`0 0 100 ${100 / fixedAspectRatio}`] A string passed to the viewBox property on the `<svg>` tag. */
	export let viewBox = `0 0 100 ${100 / fixedAspectRatio}`;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

	const { padding } = getContext('LayerCake');
</script>

<svg
	bind:this={element}
	{viewBox}
	preserveAspectRatio="none"
	style="top: {$padding.top}px; right:0px; bottom:0px; left:{$padding.left}px;width:calc(100% - {($padding.left + $padding.right)}px);height:calc(100% - {($padding.top + $padding.bottom)}px);{zIndexStyle}{pointerEventsStyle}"
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
