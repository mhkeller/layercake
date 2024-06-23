<script>
	import { LayerCake, Html } from 'layercake';

	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = false;
	let snapBaselineLabel = false;
	let gridlines = true;
	let labelPosition = 'above';
	let tickMarkLength = undefined;
	let tickGutter = 0;
	let dx = 0;
	let dy = -3;

	const padding = { bottom: 15, left: 10 };

	// let alternate = false;
	// setInterval(() => {
	// 	alternate = !alternate;
	// }, 500);
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
		<div class="mini-container">
			<LayerCake ssr percentRange position="absolute" {padding} x={xKey} y={d => d[yKey]} {data}>
				<Html>
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
				</Html>
			</LayerCake>
		</div>

		<!-- <div class="mini-container" style:display={alternate === false ? 'block' : 'none'}>
			<LayerCake
				position='absolute'
				{padding}
				x={xKey}
				y={d => d[yKey]}
				{data}
			>
				<Html>
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
				</Html>
			</LayerCake>
		</div> -->
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
		position: relative;
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
