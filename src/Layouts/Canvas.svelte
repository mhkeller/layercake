<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	let canvasElement;

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
		scaleCanvas(canvasElement, ctx, $width, $height);
	});

	$: context.ctx.set(ctx);
	setContext('ctx', context);
</script>

<canvas
	bind:this={canvasElement}
	class="layerake-layout-canvas"
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;"

>
</canvas>
<slot></slot>
