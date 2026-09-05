<script>
	import { LayerCake, Html } from 'layercake';

	import AxisXTop from '../../_components/AxisXTop.percent-range.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	let tickMarks = $state(false);
	let snapLabels = $state(false);
	let gridlines = $state(true);
	let showBaseline = $state(true);
	let tickMarkLength = $state(6);
	let tickGutter = $state(0);
	let dx = $state(0);
	let dy = $state(0);

	const padding = { top: 15, bottom: 10 };
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
			<input type="checkbox" bind:checked={showBaseline} /> showBaseline
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
		<LayerCake ssr percentRange position="absolute" {padding} x={xKey} y={d => d[yKey]} {data}>
			<Html>
				<AxisXTop
					{showBaseline}
					{tickMarks}
					{snapLabels}
					{gridlines}
					{tickMarkLength}
					{tickGutter}
					{dx}
					{dy}
				/>
			</Html>
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
	/* Give the wrapper a width and height. LayerCake fills it. */
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
