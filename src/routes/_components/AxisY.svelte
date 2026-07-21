<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	let tickMarks = $state(false);
	let snapBaselineLabel = $state(false);
	let gridlines = $state(true);
	let labelPosition = $state('above');
	let tickMarkLength = $state(undefined);
	let tickGutter = $state(0);
	let dx = $state(0);
	let dy = $state(0);
</script>

<div class="component-container">
	<div class="props">
		<label>
			<input type="checkbox" bind:checked={tickMarks} /> tickMarks
		</label>

		<label>
			<input type="checkbox" bind:checked={gridlines} /> gridlines
		</label>

		<label class="number">
			labelPosition
			<select bind:value={labelPosition}>
				<option value="above">above</option>
				<option value="even">even</option>
			</select>
		</label>

		<label class:disabled={labelPosition === 'above'}>
			<input
				type="checkbox"
				bind:checked={snapBaselineLabel}
				disabled={labelPosition === 'above'}
			/> <span class:disabled={labelPosition === 'above'}>snapBaselineLabel</span>
		</label>

		<label class="number" class:disabled={!tickMarks}>
			<span class:disabled={!tickMarks}>tickMarkLength</span>
			<input type="number" bind:value={tickMarkLength} disabled={!tickMarks} />
		</label>
		<label class="number">
			tickGutter
			<input type="number" bind:value={tickGutter} />
		</label>
		<label class="number">
			dx
			<input type="number" bind:value={dx} />
		</label>
		<label class="number">
			dy
			<input type="number" bind:value={dy} />
		</label>
	</div>

	<div class="chart-container">
		<LayerCake padding={{ bottom: 15, left: 10 }} x={xKey} y={yKey} {data}>
			<Svg>
				<AxisY
					{tickMarks}
					{snapBaselineLabel}
					{labelPosition}
					{gridlines}
					{tickMarkLength}
					{tickGutter}
					{dx}
					{dy}
					ticks={4}
				/>
			</Svg>
		</LayerCake>
	</div>
</div>

<style>
	.component-container {
		display: flex;
		flex-direction: row-reverse;
		gap: 10px;
		height: 100%;
	}
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		flex: 1;
	}
	.props {
		flex-grow: 0;
		flex-shrink: 1;
		display: flex;
		flex-direction: column;
		user-select: none;
		overflow-y: auto;
		font-size: 0.9rem;
	}
	label {
		display: flex;
		cursor: pointer;
		align-items: center;
	}
	input[type='checkbox'] {
		margin-left: 0;
	}

	label.number {
		display: flex;
		justify-content: space-between;
	}

	input[type='number'] {
		max-width: 35px;
		margin-left: 10px;
		float: right;
	}
	span.disabled {
		opacity: 0.5;
	}
	label.disabled {
		pointer-events: none;
	}
</style>
