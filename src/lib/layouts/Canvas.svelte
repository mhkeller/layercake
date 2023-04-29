<!--
	@component
	Canvas layout component
 -->
<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	const { width, height, padding } = getContext('LayerCake');

	/** @type {HTMLCanvasElement} [element] The `<canvas>` tag. Useful for bindings. */
	export let element = undefined;

	/** @type {CanvasRenderingContext2D} [context] The `<canvas>`'s 2d context. Useful for bindings. */
	export let context = undefined;

	/** @type {Number} [zIndex] The layer's z-index. */
	export let zIndex = undefined;

	/** @type {Boolean} [pointerEvents] Set this to `false` to set `pointer-events: none;` on the entire layer. */
	export let pointerEvents = undefined;

	/** @type {String} [label] A string passed to the `aria-label` on the `<canvas>` tag. */
	export let label = undefined;

	/** @type {String} [labelledBy] A string passed to the `aria-labelledby` on the `<canvas>` tag. */
	export let labelledBy = undefined;

	/** @type {String} [role] A string passed to the `role` on the `<canvas>` tag. */
	export let role = undefined;

	/** @type {Number} [tabindex] A number passed to the `tabindex` on the `<canvas>` tag. */
	export let tabindex = undefined;

	const cntxt = {
		ctx: writable({})
	};

	onMount(() => {
		context = element.getContext('2d');
		scaleCanvas(context, $width, $height);
	});

	$: cntxt.ctx.set(context);
	setContext('canvas', cntxt);
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
	{role}
	{tabindex}
></canvas>
<slot name="title"></slot>
<slot {element} {context}></slot>
