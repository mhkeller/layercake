<script>
import { getContext } from 'svelte';

const {
	containerWidth,
	containerHeight,
	padding
} = getContext('LayerCake');

</script>
<svg
	class="layercake-layout-svg"
	width={$containerWidth}
	height={$containerHeight}
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
	}
</style>
