<!--
	@component
	WebGL layout component
 -->
<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @type {HTMLCanvasElement} [element] The `<canvas>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {Object} [contextAttributes] The second argument passed to canvas.getContext. See the WebGL docs [for more info](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext). */
	export let contextAttributes = undefined;

	/** @type {WebGLRenderingContext} [context] The `<canvas>`'s WebGL context. Useful for bindings. */
	export let context = undefined;

	/** @type {String} [fallbackText] Text to display if the browser won't render a canvas tag. */
	export let fallbackText = '';

	/** @type {String} [label] A string passed to the `aria-label` on the `<canvas>` tag. */
	export let label = undefined;

	/** @type {String} [labelledBy] A string passed to the `aria-labelledby` on the `<canvas>` tag. */
	export let labelledBy = undefined;

	let testGl;

	const { padding } = getContext('LayerCake');

	const cntxt = {
		gl: writable({})
	};

	onMount(() => {
		/* --------------------------------------------
		 * Try to find a working webgl context
		 */
		const contexts = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
		for (let j = 0; j < contexts.length; j++) {
			testGl = element.getContext(contexts[j], contextAttributes);
			if (testGl) {
				// @ts-ignore
				context = testGl;
				break;
			}
		}
	});

	$: cntxt.gl.set(context);
	setContext('gl', cntxt);
</script>

<canvas
	bind:this={element}
	class="layercake-layout-webgl"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style:top={$padding.top + 'px'}
	style:right={$padding.right + 'px'}
	style:bottom={$padding.bottom + 'px'}
	style:left={$padding.left + 'px'}
	style="width:100%;height:100%;position:absolute;"
	aria-label={label}
	aria-labelledby={labelledBy}
>{fallbackText}</canvas>
<slot name="title"></slot>
<slot {element} {context}></slot>
