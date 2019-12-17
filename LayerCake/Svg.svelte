<script>
import { getContext } from 'svelte';

const {
	containerWidth,
	containerHeight,
	padding,
	width,
	height
} = getContext('LayerCake');

</script>
<svg
	class="lyrck-svg"
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
