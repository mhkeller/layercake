<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from '../../_components/Sankey.svelte';

	// An object with `nodes` and `links` arrays, the shape d3-sankey takes
	import data from '../../_data/sankey-data.js';
</script>

<div class="chart-container">
	<LayerCake {data}>
		<Svg>
			<Sankey getNodeFill={() => '#00bbff'} getLinkStroke={() => '#00bbff35'} />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
