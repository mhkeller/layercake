<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	export let zIndex = undefined;
	export let pointerEvents = undefined;

	export let element = undefined;
	export let context = undefined;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

	const { width, height, padding } = getContext('LayerCake');

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
	style="width:100%;height:100%;top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;{zIndexStyle}{pointerEventsStyle}"
></canvas>
<slot {element} {context}></slot>
