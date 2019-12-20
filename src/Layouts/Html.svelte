<script>
import { getContext } from 'svelte';

const {
	width,
	height,
	padding
} = getContext('LayerCake');

</script>

<div
	class="layercake-layout-html"
	width={$width}
	height={$height}
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;"
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
