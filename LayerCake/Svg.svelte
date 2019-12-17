<script>
import { getContext } from 'svelte';

const {
	data,
	containerWidth,
	containerHeight,
	padding,
	width,
	height,
	xGet,
	yGet
} = getContext('LayerCake');

</script>

<p>container width is {$containerWidth}</p>
<p>width is {$width}</p>
<p>container height is {$containerHeight}</p>
<p>height is {$height}</p>

<svg width={$containerWidth} height={$containerHeight}>
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
