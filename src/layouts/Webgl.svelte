<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let contextAttributes = undefined;
	export let zIndex = undefined;
	export let pointerEvents = undefined;

	export let element = undefined;
	let testGl;
	export let context = undefined;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

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
	style="width:100%;height:100%;top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;position:absolute;{zIndexStyle}{pointerEventsStyle}"
></canvas>
<slot {element} {context}></slot>
