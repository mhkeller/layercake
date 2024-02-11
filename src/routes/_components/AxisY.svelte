<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = true;
	let snapBaselineLabel = true;
	let labelPosition = 'above';
	let tickMarkLength = 'long';
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
		margin-bottom: 25px;
		height: 25px;
		display: flex;
		flex-direction: row;
		user-select: none;
		gap: 10px;
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

	<select bind:value={tickMarkLength} disabled={!tickMarks}>
		<option disabled>tickMarkLength</option>
		<option value="long">long</option>
		<option value="short">short</option>
	</select>

	<label class:disabled={labelPosition === 'above'}>
		<input type="checkbox" bind:checked={snapBaselineLabel} disabled={labelPosition === 'above'}/> snapBaselineLabel
	</label>
</div>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, left: 10 }}
		x={xKey}
		y={yKey}
		data={data}
	>
		<Svg>
			<AxisY
				{tickMarks}
				{snapBaselineLabel}
				{labelPosition}
				tickMarkLength={Number.isNaN(+tickMarkLength) ? tickMarkLength : +tickMarkLength}
				ticks={4}
			/>
		</Svg>
	</LayerCake>
</div>
