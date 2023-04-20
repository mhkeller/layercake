<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleSequential } from 'd3-scale';
	import { interpolateViridis, interpolateRdBu } from 'd3-scale-chromatic';

	import ColorBar from '../../_components/ColorBar.html.svelte';

	const data = [{ myZ: [0, 0.25, 0.5, 0.75, 1] }];

	const zKey = 'myZ';
	let cbarWidth = 35;
	// let cbarHeight = 1;
	let nTicks = 3;
	let snapTicks = true;
	let tickMarks = true;
	let tickSide = 'bottom';
	let labelSide = 'left';
</script>

<form>
	<div>
		<!-- <label for="cbar-width">width:</label>
		<input type="range" bind:value={cbarWidth} min="10" max="50" /> {cbarWidth} -->
		<!-- <label for="n-ticks">ticks:</label>
		<input type="range" bind:value={nTicks} min="1" max="10" /> {nTicks} -->
<!--
		<label for="snap-ticks">Snap ticks</label>
		<input id="snap-ticks" type="checkbox" bind:checked={snapTicks} />

		<label for="tick-marks">Tick marks</label>
		<input id="tick-marks" type="checkbox" bind:checked={tickMarks} /> -->
	</div>

	<div>
		Tick side:
		<select bind:value={tickSide}>
			<option value="top">top</option>
			<option value="bottom">bottom</option>
		</select>

		Label side:
		<select bind:value={labelSide}>
			<option value="top-left">top-left</option>
			<option value="top-right">top-right</option>
			<option value="right">right</option>
			<option value="bottom-left">bottom-left</option>
			<option value="bottom-right">bottom-right</option>
			<option value="left">left</option>
		</select>

	</div>
</form>
<div class="chart-container">
	<LayerCake ssr={true} z={zKey} zScale={scaleSequential(interpolateViridis)} {data}>
		<Html>
			<ColorBar label="Label one" {labelSide} formatTick={d => d * 100} {tickSide} {snapTicks} {tickMarks} ticks={nTicks} --cbar-width="{cbarWidth}em" />
		</Html>
	</LayerCake>
</div>
<!-- <div class="chart-container">
	<LayerCake ssr={true} z={zKey} zScale={scaleSequential(interpolateRdBu)} {data}>
		<Html>
			<ColorBar label="Label two" {labelSide} {tickSide} {snapTicks} {tickMarks} ticks={nTicks} --cbar-width="{cbarWidth}em" />
		</Html>
	</LayerCake>
</div> -->

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
		margin-bottom: 8px;
	}
	form {
		display: flex;
		align-items: center;
		gap: 1em;
		margin: 1em 0;
	}
</style>
