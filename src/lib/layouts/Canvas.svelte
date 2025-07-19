<!--
	@component
	Canvas layout component
 -->
<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	const { width, height, padding } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {HTMLCanvasElement|undefined} [element] The `<canvas>` element. A useful prop to bind to.
	 * @property {CanvasRenderingContext2D|null} [context] The 2D rendering context for the canvas. A useful prop to bind to.
	 * @property {number|undefined} [zIndex] Set the layout's z-index.
	 * @property {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on all of this layout's layers.
	 * @property {string} [fallback] Fallback text to display when the canvas is not supported.
	 * @property {string|undefined} [label] A string passed to the `aria-label` on the `<svg>` element.
	 * @property {string|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<svg>` element.
	 * @property {string|undefined} [describedBy] A string passed to `aria-describedby` property on the `<svg>` element.
	 * @property {import('svelte').Snippet<[{ element: HTMLCanvasElement | undefined, context: CanvasRenderingContext2D | null }]>} [children]
	 */

	/** @type {Props} */
	let {
		element = $bindable(undefined),
		context = $bindable(null),
		zIndex = undefined,
		pointerEvents = undefined,
		fallback = '',
		label = undefined,
		labelledBy = undefined,
		describedBy = undefined,
		children
	} = $props();

	/**
	 * @type {{ ctx: import('svelte/store').Writable<CanvasRenderingContext2D|null> }}
	 */
	const cntxt = {
		ctx: writable(null)
	};
	setContext('canvas', cntxt);

	onMount(() => {
		if (element) {
			context = element.getContext('2d');
			if (context) {
				scaleCanvas(context, $width, $height);
			}
		}
	});

	$effect(() => {
		console.log('setting context');

		cntxt.ctx.set(context);
	});
</script>

<canvas
	bind:this={element}
	class="layercake-layout-canvas"
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
