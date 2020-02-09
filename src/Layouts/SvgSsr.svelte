<script>
	import { getContext } from 'svelte';

	export let zIndex = undefined;
	let zIndexStyle = '';

	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	const { padding } = getContext('LayerCake');
</script>

<svg
	viewBox="0 0 100 100"
	preserveAspectRatio="none"
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;{zIndexStyle}"
>
	<slot></slot>
</svg>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	svg :global(*) {
		vector-effect: non-scaling-stroke;
	}
</style>
