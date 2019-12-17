<script>
	import { getContext } from 'svelte';

	const {
		data,
		xGet,
		yGet
	} = getContext('LayerCake');
</script>

{#each $data as row, i}
	<div class="dot"
		style="left:{$xGet(row)}px;top:{$yGet(row)}px"
	>
	</div>
{/each}

<style>
	.dot {
		position: absolute;
		border-radius: 50%;
		background-color: #0fc;
		width: 5px;
		height: 5px;
		transform: translate(-50%, -50%);
	}
</style>
