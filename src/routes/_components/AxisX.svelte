<script>
	import { LayerCake, Svg } from 'layercake';

	import AxisX from '../../_components/AxisX.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	let tickMarks = $state(false);
	let gridlines = $state(true);
	let snapLabels = $state(false);
	let baseline = $state(true);
	let tickMarkLength = $state(6);
	let tickGutter = $state(0);
	let dx = $state(0);
	let dy = $state(12);
</script>

<div class="component-container">
	<div class="props">
		<label>
			<input type="checkbox" bind:checked={tickMarks} /> tickMarks
		</label>

		<label>
			<input type="checkbox" bind:checked={gridlines} /> gridlines
		</label>

		<label>
			<input type="checkbox" bind:checked={baseline} /> baseline
		</label>

		<label>
			<input type="checkbox" bind:checked={snapLabels} /> snapLabels
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
		<LayerCake padding={{ top: 10, bottom: 20 }} x={xKey} y={yKey} {data}>
			<Svg>
				<AxisX
					{baseline}
					{tickMarks}
					{gridlines}
					{snapLabels}
					{tickMarkLength}
					{tickGutter}
					{dx}
					{dy}
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
