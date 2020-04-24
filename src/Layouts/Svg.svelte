<script>
	import { getContext } from 'svelte';

	export let zIndex = undefined;
	let zIndexStyle = '';

	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	const { containerWidth, containerHeight, padding } = getContext('LayerCake');
</script>
<svg
	class="layercake-layout-svg"
	width={$containerWidth}
	height={$containerHeight}
	style="{zIndexStyle}"
>
	<g transform="translate({$padding.left}, {$padding.top})">
		<slot></slot>
	</g>
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	}
</style>
