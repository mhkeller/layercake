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
	style="top: {$padding.top}px; right:0px; bottom:0px; left:{$padding.left}px;width:calc(100% - {($padding.left + $padding.right)}px);height:calc(100% - {($padding.top + $padding.bottom)}px);'{zIndexStyle}"
>
	<g transform="translate({$padding.left}px, {$padding.top}px)">
		<slot></slot>
	</g>
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
