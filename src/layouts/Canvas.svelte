<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	export let zIndex = undefined;
	export let pointerEvents = undefined;

	export let canvas;
	export let ctx;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

	const { width, height, padding } = getContext('LayerCake');

	const context = {
		ctx: writable({})
	};

	onMount(() => {
		ctx = canvas.getContext('2d');
		scaleCanvas(ctx, $width, $height);
	});

	$: context.ctx.set(ctx);
	setContext('canvas', context);
</script>

<canvas
	bind:this={canvas}
	class="layercake-layout-canvas"
	style="width:100%;height:100%;top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;{zIndexStyle}{pointerEventsStyle}"
></canvas>
<slot {canvas} {ctx}></slot>
