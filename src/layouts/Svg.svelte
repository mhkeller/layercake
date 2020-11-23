<script>
	import { getContext } from 'svelte';

	export let viewBox = undefined;
	export let zIndex = undefined;
	export let pointerEvents = undefined;

	let zIndexStyle = '';
	$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';

	let pointerEventsStyle = '';
	$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';

	const { containerWidth, containerHeight, padding } = getContext('LayerCake');
</script>
<svg
	class="layercake-layout-svg"
	{viewBox}
	width={$containerWidth}
	height={$containerHeight}
	style="{zIndexStyle}{pointerEventsStyle}"
>
	<defs>
		<slot name="defs"></slot>
	</defs>
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
