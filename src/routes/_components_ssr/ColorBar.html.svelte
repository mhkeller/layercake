<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleSequential } from 'd3-scale';
	import * as d3ScaleChromatic from 'd3-scale-chromatic';

	import ColorBar from '../../_components/ColorBar.html.svelte';

	const data = [{ myZ: [0, 0.25, 0.5, 0.75, 1] }];

	const colorScales = Object.fromEntries(Object.entries(d3ScaleChromatic).map(([k, v]) => {
		if (k.startsWith('interpolate')) {
			return [k, v];
		}
		return null;
	}).filter(Boolean));

	const zKey = 'myZ';
	let cbarWidth = 100;
	// let cbarHeight = 1;
	let nTicks = 3;
	let snapTicks = true;
	let tickMarks = true;
	let tickSide = 'bottom';
	let labelSide = 'left';
	let scaleName = 'interpolateViridis';
</script>

<div class="chart-container">
	<LayerCake ssr={true} z={zKey} zScale={scaleSequential(colorScales[scaleName])} {data}>
		<Html>
			<ColorBar label="Label one" {labelSide} formatTick={d => d * 100} {tickSide} {snapTicks} {tickMarks} ticks={nTicks} --cbar-width="{cbarWidth}%" />
		</Html>
	</LayerCake>
</div>

<div class="controls-container">
		<div class="row">
			<label class="form-label" for="cbar-width">width:</label>
			<input type="range" bind:value={cbarWidth} min="50" max="100" /> <span style="display:inline-block;width:25px;text-align:right;">{cbarWidth}%</span>
		</div>
		<!-- <div class="row">
			<label class="form-label" for="n-ticks">ticks:</label>
			<input type="range" bind:value={nTicks} min="1" max="10" /> {nTicks}
		</div> -->

		<div class="row">
			<label class="form-label" for="snap-ticks">snap ticks</label>
			<input id="snap-ticks" type="checkbox" bind:checked={snapTicks} />
		</div>
	<div class="row">
		<label class="form-label" for="tick-marks">tick marks</label>
		<input id="tick-marks" type="checkbox" bind:checked={tickMarks} />
	</div>

	<div class="row">
		<div class="form-label">tick side:</div>
		<select bind:value={tickSide}>
			<option value="top">top</option>
			<option value="bottom">bottom</option>
		</select>
	</div>

	<div class="row">
		<div class="form-label">label side:</div>
		<select bind:value={labelSide}>
			<option value="top-left">top-left</option>
			<option value="top-right">top-right</option>
			<option value="right">right</option>
			<option value="bottom-left">bottom-left</option>
			<option value="bottom-right">bottom-right</option>
			<option value="left">left</option>
		</select>
	</div>
	<div class="row">
		<div class="form-label">scale:</div>
		<select bind:value={scaleName}>
			{#each Object.keys(colorScales) as n}
				<option value={n}>{n}</option>
			{/each}
		</select>
	</div>
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
		height: 50px;
		margin-top: 5px;
	}
	.controls-container {
		margin-bottom: 21px;
		max-width: 325px;
		text-align: right;
	}
	.row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2px;
		font-size: 0.8em;
		font-family: Consolas, monaco, monospace;
	}
	.row input[type="range"]{
		height: 15px;
	}
</style>
