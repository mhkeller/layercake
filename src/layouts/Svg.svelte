<script>
	import { getContext } from 'svelte';

	let svg;
	let g;
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
	bind:this={svg}
	class="layercake-layout-svg"
	{viewBox}
	width={$containerWidth}
	height={$containerHeight}
	style="{zIndexStyle}{pointerEventsStyle}"
>
	<defs>
		<slot name="defs"></slot>
	</defs>
	<g bind:this={g} class="layercake-layout-svg_g" transform="translate({$padding.left}, {$padding.top})">
		<slot {svg} {g}></slot>
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
