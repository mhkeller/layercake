<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisX from '../../_components/AxisX.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = true;
	let snapTicks = true;
	let baseline = true;
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
		height: 25px;
		display: flex;
		flex-direction: row;
		user-select: none;
		gap: 10px;
	}
	label {
		display: flex;
		cursor: pointer;
		align-items: center;
	}
	select {
		width: 60px;
	}
</style>

<div class="props">
	<label>
		<input type="checkbox" bind:checked={baseline}/> baseline
	</label>

	<label>
		<input type="checkbox" bind:checked={snapTicks}/> snapTicks
	</label>

	<label>
		<input type="checkbox" bind:checked={tickMarks}/> tickMarks
	</label>

	<select bind:value={tickMarkLength} disabled={!tickMarks}>
		<option disabled>tickMarkLength</option>
		<option value="long">long</option>
		<option value="short">short</option>
	</select>

</div>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 20 }}
		x={xKey}
		y={yKey}
		data={data}
	>
		<Svg>
			<AxisX
				{baseline}
				{tickMarks}
				{snapTicks}
				tickMarkLength={Number.isNaN(+tickMarkLength) ? tickMarkLength : +tickMarkLength}
			/>
		</Svg>
	</LayerCake>
</div>
