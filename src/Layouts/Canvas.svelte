<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	export let zIndex = undefined;
	let canvasElement;
	let zIndexStyle = '';

	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	const {
		width,
		height,
		padding
	} = getContext('LayerCake');

	let ctx;

	const context = {
		ctx: writable({})
	};

	onMount(() => {
		ctx = canvasElement.getContext('2d');
		scaleCanvas(ctx, $width, $height);
	});

	$: context.ctx.set(ctx);
	setContext('ctx', context);
</script>

<canvas
	bind:this={canvasElement}
	class="layercake-layout-canvas"
	style="width:100%;height:100%;top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;{zIndexStyle}"
></canvas>
<slot></slot>
