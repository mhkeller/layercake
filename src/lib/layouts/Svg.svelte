<!--
	@component
	SVG layout component
 -->
<script>
	import { getContext } from 'svelte';

	/** @type {Element} [element] The layer's `<svg>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Element} [innerElement] The layer's `<g>` tag. Useful for bindings. */
	export let innerElement = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {String} [viewBox] A string passed to the viewBox property on the `<svg>` tag. */
	export let viewBox = undefined;

	/** @type {Object|null} [attrs] An object that sets additional attribute values onto the `<svg>` tag*/
		export let attrs = null;

	$: if (element && attrs) {
		const attrKeys = Object.keys(attrs);
		for (let i = 0; i < attrKeys.length; i++) {
			const attr = attrKeys[i];
			const property = attrs[attr];
			if (!element.hasAttribute(attr) || element.getAttribute(attr) !== property) {
				element.setAttribute(attr, property);
			}
		}
	}

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
>
	<defs>
		<slot name="defs"></slot>
	</defs>
	<g
		bind:this={innerElement}
		class="layercake-layout-svg_g"
		transform="translate({$padding.left}, {$padding.top})">
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
