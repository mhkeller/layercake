<script>
	import { getContext, onMount } from 'svelte';

	let canvasElement;

	const {
		width,
		height,
		padding
	} = getContext('LayerCake');


	onMount(() => {
		const ctx = canvasElement.getContext('2d');
	});
</script>

<canvas
	bind:this={canvasElement}
	class="lyrck-canvas"
	width={$width}
	height={$height}
	style="top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;"

>

</canvas>
