<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleSequential } from 'd3-scale';
	import { interpolateViridis, interpolateRdBu } from 'd3-scale-chromatic';

	import ColorBar from '../../_components/ColorBar.html.svelte';

	const data = [{ myZ: [0, 0.25, 0.5, 0.75, 1] }];

	const zKey = 'myZ';
	let cbarWidth = 10;
	let cbarHeight = 1;
	let nTicks = 3;
</script>

<form>
	<label for="cbar-width">width:</label>
	<input type="number" bind:value={cbarWidth} min="3" max="50" id="cbar-width" />
	<input type="range" bind:value={cbarWidth} min="3" max="50" />
	<label for="cbar-height">height:</label>
	<input type="number" bind:value={cbarHeight} min="0.1" max="4" step="0.1" id="cbar-height" />
	<input type="range" bind:value={cbarHeight} min="0.1" max="4" step="0.1" />
	<label for="n-ticks">ticks:</label>
	<input type="number" bind:value={nTicks} min="1" max="20" id="n-ticks" />
	<input type="range" bind:value={nTicks} min="1" max="20" />
</form>
<div class="chart-container">
	<LayerCake ssr={true} z={zKey} zScale={scaleSequential(interpolateViridis)} {data}>
		<Html>
			<ColorBar ticks={nTicks} --cbar-width="{cbarWidth}em" --cbar-height="{cbarHeight}em" />
		</Html>
	</LayerCake>
</div>
<div class="chart-container">
	<LayerCake ssr={true} z={zKey} zScale={scaleSequential(interpolateRdBu)} {data}>
		<Html>
			<ColorBar />
		</Html>
	</LayerCake>
</div>

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
	form {
		display: flex;
		align-items: center;
		gap: 1em;
		margin: 1em 0;
	}
</style>
