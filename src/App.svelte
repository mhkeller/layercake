<script>
// console.log(__globals);
import LayerCake from '../LayerCake/LayerCake.svelte';
import Svg from '../LayerCake/Svg.svelte';
</script>

<style>
	h1 {
		color: purple;
	}
	#my-container{
		width: 100%;
		height: 200px;
		background: #f0c;
	}
</style>

<div id="my-container">
	<LayerCake>
		<Svg/>
	</LayerCake>
</div>
