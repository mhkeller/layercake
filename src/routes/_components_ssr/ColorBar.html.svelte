<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleSequential } from 'd3-scale';
	import { interpolateViridis, interpolateRdBu } from 'd3-scale-chromatic';

	import ColorBar from '../../_components/ColorBar.html.svelte';

	const data = [
		{ myZ: [0, 0.25, 0.5, 0.75, 1] },
	]

	const zKey = 'myZ';
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
		height: 25%;
	}
</style>

<div class="chart-container">
	<LayerCake
		ssr={true}
		z={zKey}
		zScale={scaleSequential(interpolateViridis)}
		data={data}
	>
		<Html>
			<ColorBar/>
		</Html>
	</LayerCake>
</div>
<div class="chart-container">
	<LayerCake
		ssr={true}
		z={zKey}
		zScale={scaleSequential(interpolateRdBu)}
		data={data}
	>
		<Html>
			<ColorBar/>
		</Html>
	</LayerCake>
</div>
