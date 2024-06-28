<!--
	@component
	WebGL layout component
 -->
<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @type {HTMLCanvasElement|undefined} [element] The `<canvas>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {Number|undefined} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {Object|undefined} [contextAttributes] The second argument passed to canvas.getContext. See the WebGL docs [for more info](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext). */
	export let contextAttributes = undefined;

	/** @type {WebGLRenderingContext|undefined} [context] The `<canvas>`'s WebGL context. Useful for bindings. */
	export let context = undefined;

	/** @type {String} [fallback] Text to display if the browser won't render a canvas tag. You can also set arbitrary HTML via the "fallback" slot but this is fine if you just need text. If you use the "fallback" slot, this prop is ignored. */
	export let fallback = '';

	/** @type {String|undefined} [label] A string passed to the `aria-label` property on the `<canvas>` tag. */
	export let label = undefined;

	/** @type {String|undefined} [labelledBy] A string passed to the `aria-labelledby` property on the `<canvas>` tag. */
	export let labelledBy = undefined;

	/** @type {String|undefined} [describedBy] A string passed to the `aria-describedby` property on the `<canvas>` tag. */
	export let describedBy = undefined;

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
	aria-describedby={describedBy}
	><slot name="fallback"
		>{#if fallback}{fallback}{/if}</slot
	></canvas
>
<slot {element} {context}></slot>
