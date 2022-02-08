<script>
	import { LayerCake, Svg } from 'layercake';

	import Sankey from '../../_components/Sankey.svelte';

	import data from '../../_data/sankey-data.js';
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		{data}
	>
		<Svg>
			<Sankey
				colorNodes={d => '#00bbff'}
				colorLinks={d => '#00bbff35'}
			/>
		</Svg>
	</LayerCake>
</div>
