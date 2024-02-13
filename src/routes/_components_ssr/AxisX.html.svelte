<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';

	import AxisX from '../../_components/AxisX.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = true;
	let snapLabels = true;
	let baseline = true;
	let gridlines = true;
	let tickMarkLength = 6;
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
		height: 200px;
	}
	.props {
		display: flex;
		flex-direction: row;
		user-select: none;
		flex-wrap: wrap;
		gap: 10px;
		row-gap: 0px;
	}
	label {
		display: flex;
		cursor: pointer;
		align-items: center;
	}
	input[type="number"] {
		width: 50px;
	}
</style>

<div class="props">
	<label>
		<input type="checkbox" bind:checked={baseline}/> baseline
	</label>

	<label>
		<input type="checkbox" bind:checked={snapLabels}/> snapLabels
	</label>

	<label>
		<input type="checkbox" bind:checked={tickMarks}/> tickMarks
	</label>

	<label>
		<input type="checkbox" bind:checked={gridlines}/> gridlines
	</label>

	<input type="number" bind:value={tickMarkLength} placeholder="tickMarkLength" disabled={!tickMarks}/>
</div>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 20, bottom: 20 }}
		x={xKey}
		y={d => d[yKey]}
		yDomain={[0, null]}
		data={data}
	>
		<Html>
			<AxisX
				{baseline}
				{tickMarks}
				{gridlines}
				{snapLabels}
				{tickMarkLength}
			/>
		</Html>
	</LayerCake>
</div>
