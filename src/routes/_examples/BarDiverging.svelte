<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Bar from '../../_components/Bar.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/yearChanges.csv';

	const xKey = 'change';
	const yKey = 'year';

	data.forEach(d => {
		d[xKey] = +d[xKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 5, bottom: 20, left: 35 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05)}
		c={d => (d[xKey] < 0 ? 'down' : 'up')}
		cDomain={['up', 'down']}
		cRange={['#00e047', '#f0c']}
		{data}
		xDomain={([min, max]) => [Math.min(0, min), Math.max(0, max)]}
	>
		<!--
			The bars grow out of zero, so zero has to be on the axis. A function
			domain gets handed the [min, max] measured from the data and widens
			whichever end is missing zero. The same line works whether your numbers
			are all positive, all negative or a mix of both.

			The `c` scale sorts each row into "up" or "down" and hands the Bar
			component a color for it.
		-->
		{#snippet children(cake)}
			<Svg>
				<AxisX tickMarks baseline snapLabels />
				<AxisY tickMarks gridlines={false} />
				<Bar />
				<!-- Bars run left and right from here, so mark it -->
				<line
					class="zero"
					x1={cake.xScale(0)}
					x2={cake.xScale(0)}
					y1={cake.yRange[0]}
					y2={cake.yRange[1]}
				/>
			</Svg>
		{/snippet}
	</LayerCake>
</div>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 250px;
	}

	.zero {
		stroke: #333;
	}
</style>
