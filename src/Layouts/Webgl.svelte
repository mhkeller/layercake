<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let contextOptions;
	export let zIndex = undefined;
	let canvasElement;
	let testGl;
	let gl;
	let zIndexStyle = '';

	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	const { width, height, padding } = getContext('LayerCake');

	const context = {
		gl: writable({}),
		canvas: writable({})
	};

	onMount(() => {
		/* --------------------------------------------
		 * Try to find a working webgl context
		 */
		const contexts = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
		for (let j = 0; j < contexts.length; j++) {
			testGl = canvasElement.getContext(contexts[j], contextOptions);
			if (testGl) {
				gl = testGl;
				break;
			}
		}
	});

	$: context.gl.set(gl);
	// $: context.canvas.set(canvasElement);
	setContext('gl', context);

</script>

<canvas
	bind:this={canvasElement}
	class="layercake-layout-webgl"
	style="width:100%;height:100%;top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;{zIndexStyle}"
></canvas>
<slot></slot>
