<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import scaleCanvas from '../lib/scaleCanvas.js';

	let canvasElement;
	let testGl;
	let gl;

	const {
		width,
		height,
		padding
	} = getContext('LayerCake');

	const context = {
		gl: writable({})
	};

	onMount(() => {
		/* --------------------------------------------
		 * Try to find a working webgl context
		 */
		const contexts = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
		for (var j = 0; j < contexts.length; j++) {
			testGl = canvas.getContext(contexts[j], contextOptions);
			if (testGl) {
				gl = testGl;
				break;
			}
		}
	});

	$: context.gl.set(gl);
	setContext('gl', context);
</script>

<canvas
	bind:this={canvasElement}
	class="layerake-layout-webgl"
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;"
></canvas>
<slot></slot>
