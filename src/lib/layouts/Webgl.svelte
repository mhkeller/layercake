<!--
	@component
	WebGL layout component
 -->
<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * @typedef {Object} Props
	 * @property {HTMLCanvasElement|undefined} [element] The `<canvas>` element. A useful prop to bind to.
	 * @property {WebGLRenderingContext|null} [context] The WebGL rendering context for the canvas. A useful prop to bind to.
	 * @property {Object|undefined} [contextAttributes] Attributes to pass to the WebGL context.
	 * @property {number|undefined} [zIndex] Set the layout's z-index.
	 * @property {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on all of this layout's layers.
	 * @property {string} [fallback] Fallback text to display when the canvas is not supported.
	 * @property {string|undefined} [label] A string passed to the `aria-label` on the `<canvas>` element.
	 * @property {string|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<canvas>` element.
	 * @property {string|undefined} [describedBy] A string passed to the `aria-describedby` property on the `<canvas>` element.
	 * @property {import('svelte').Snippet<[{ element: HTMLCanvasElement | undefined, context: WebGLRenderingContext | null }]>} [children]
	 */

	/** @type {Props} */
	let {
		element = $bindable(undefined),
		zIndex = undefined,
		pointerEvents = undefined,
		contextAttributes = undefined,
		context = $bindable(null),
		fallback = '',
		label = undefined,
		labelledBy = undefined,
		describedBy = undefined,
		children
	} = $props();

	let testGl;

	const { padding } = getContext('LayerCake');

	/**
	 * @type {{ gl: import('svelte/store').Writable<WebGLRenderingContext|null> }}
	 */
	const cntxt = {
		gl: writable(null)
	};

	onMount(() => {
		if (!element) return;
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

	$effect(() => {
		cntxt.gl.set(context);
	});
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
>
	{#if fallback}{fallback}{/if}
</canvas>
{@render children?.({ element, context })}
