<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/yearChanges.csv';

	const xKey = 'year';
	const yKey = 'change';
</script>

<div class="chart-container">
	<!--
		The columns grow out of zero, so zero has to be inside the domain. The
		`yDomain` function receives the [min, max] measured from the data and
		stretches whichever end doesn't reach zero. It works whether the numbers
		are all positive, all negative or a mix.

		The `c` scale turns each row's "up" or "down" into a color for the
		Column component.

		`yPadding` adds 18 pixels of room at each end so the numbers on the
		longest columns fit.
	-->
	<LayerCake
		padding={{ top: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={([min, max]) => [Math.min(0, min), Math.max(0, max)]}
		yPadding={[18, 18]}
		c={d => (d[yKey] < 0 ? 'down' : 'up')}
		cDomain={['up', 'down']}
		cRange={['#00e047', '#ff00cc']}
		{data}
	>
		{#snippet children(k)}
			<Svg>
				<AxisX gridlines={false} tickMarks snapLabels />
				<AxisY />
				<Column showLabels />
				<!-- Columns run up and down from here, so mark it -->
				<line class="zero" x1={k.xRange[0]} x2={k.xRange[1]} y1={k.yScale(0)} y2={k.yScale(0)} />
			</Svg>
		{/snippet}
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}

	.zero {
		stroke: #333;
	}
</style>
