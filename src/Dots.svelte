<script>
	import { getContext } from 'svelte';

	const {
		data,
		xGet,
		yGet
	} = getContext('LayerCake');
</script>

{#each $data as row, i}
	<circle cx="{$xGet(row)}" cy="{$yGet(row)}" fill="black" r="5" />
{/each}
