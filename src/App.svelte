<script>
import { getContext } from 'svelte';
import LayerCake from '../LayerCake/LayerCake.svelte';
import Svg from '../LayerCake/Svg.svelte';

const data = [
	{ x: 0, y: 0 },
	{ x: 10, y: 20 },
	{ x: 15, y: 15 },
	{ x: 12, y: 10 },
	{ x: 5, y: 10 }
];
</script>

<style>
	#my-container {
		width: 100%;
		height: 200px;
		background: #f0c;
	}
</style>

<div id="my-container">
	<LayerCake
		x={'x'}
		y={'y'}
		data={data}
		reverseY={false}
	>
		<Svg>
<!-- 			{#each context.data as row, i}
				<line x1="0" y1="80" x2="100" y2="{10 * i}" stroke="black" />
			{/each}
 -->		</Svg>
	</LayerCake>
</div>
