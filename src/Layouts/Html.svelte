<script>
	import { getContext } from 'svelte';

	export let zIndex = undefined;
	let zIndexStyle = '';

	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	const { padding } = getContext('LayerCake');

</script>

<div
	class="layercake-layout-html"
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;{zIndexStyle}"
>
	<slot></slot>
</div>

<style>
	div,
	slot {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
