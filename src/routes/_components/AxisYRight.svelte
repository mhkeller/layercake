<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisYRight from '../../_components/AxisYRight.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = false;
	let snapBaselineLabel = false;
	let labelPosition = 'above';
	let gridlines = true;
	let tickMarkLength = undefined;
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
		margin-top: 5px;
		height: 25px;
		display: flex;
		flex-direction: row;
		user-select: none;
		gap: 10px;
		margin-bottom: 15px;
		flex-wrap: wrap;
	}
	label {
		display: flex;
	}
	label:not(.disabled) {
		cursor: pointer;
	}
</style>

<div class="props">
	<select bind:value={labelPosition}>
		<option disabled>labelPosition</option>
		<option value="above">above</option>
		<option value="even">even</option>
	</select>

	<label>
		<input type="checkbox" bind:checked={tickMarks}/> tickMarks
	</label>

	<label>
		<input type="checkbox" bind:checked={gridlines}/> gridlines
	</label>

	<label class:disabled={labelPosition === 'above'}>
		<input type="checkbox" bind:checked={snapBaselineLabel} disabled={labelPosition === 'above'}/> snapBaselineLabel
	</label>

	<input type="number" bind:value={tickMarkLength} placeholder="tickMarkLength" disabled={!tickMarks}/>
</div>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 15, right: 25 }}
		x={xKey}
		y={yKey}
		data={data}
	>
		<Svg>
			<AxisYRight
				{tickMarks}
				{labelPosition}
				{snapBaselineLabel}
				{gridlines}
				{tickMarkLength}
				ticks={4}
			/>
		</Svg>
	</LayerCake>
</div>
