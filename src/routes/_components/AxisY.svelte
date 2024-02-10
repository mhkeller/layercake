<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisY from '../../_components/AxisY.svelte';
	import Bar from '../../_components/Bar.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = true;
	let labelPosition = 'above';
	let tickMarkWidth = 'long';
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: calc(100% - 20px);
		height: 200px;
	}
	.props {
		display: flex;
		flex-direction: row;
		user-select: none;
		cursor: pointer;
		gap: 20px;
	}
</style>

<div class="props">
	<select bind:value={labelPosition}>
		<option disabled>labelPosition</option>
		<option value="above">above</option>
		<option value="even">even</option>
	</select>

	<label>
		<input type="checkbox" bind:checked={tickMarks}/>
		tickMarks
	</label>

	<select bind:value={tickMarkWidth}>
		<option disabled>tickMarkWidth</option>
		<option value="long">long</option>
		<option value="short">short</option>
		<option value="10">10 (or any number value)</option>
	</select>

</div>

<div class="chart-container">
	<LayerCake
		padding={{ right: 10, bottom: 20, left: 10 }}
		x={xKey}
		y={yKey}
		data={data}
	>
		<Svg>
			<AxisY
				{tickMarks}
				{labelPosition}
				tickMarkWidth={Number.isNaN(+tickMarkWidth) ? tickMarkWidth : +tickMarkWidth}
				ticks={4}
			/>
		</Svg>
	</LayerCake>
</div>
