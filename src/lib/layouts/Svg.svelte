<script>
	/**
		SVG layout component
		@param {Number} [zIndex] The layer's z-index.
		@param {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer.
		@param {Element} [element] The layer's `<svg>` tag. Useful for bindings.
		@param {String} [viewBox] A string passed to the viewBox property on the `<svg>` tag.
	*/
	import { getContext } from 'svelte';

	export let element = undefined;
	export let viewBox = undefined;
	export let zIndex = undefined;
	export let pointerEvents = undefined;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

	const { containerWidth, containerHeight, padding } = getContext('LayerCake');
</script>
<svg
	bind:this={element}
	class="layercake-layout-svg"
	{viewBox}
	width={$containerWidth}
	height={$containerHeight}
	style="{zIndexStyle}{pointerEventsStyle}"
>
	<defs>
		<slot name="defs"></slot>
	</defs>
	<g class="layercake-layout-svg_g" transform="translate({$padding.left}, {$padding.top})">
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
