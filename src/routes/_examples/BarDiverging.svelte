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
			The bars grow out of zero, so zero has to be inside the domain. This
			function receives the [min, max] measured from the data and stretches
			whichever end doesn't reach zero. It works whether your numbers are
			all positive, all negative or a mix.

			The `c` scale turns each row's "up" or "down" into a color for the Bar
			component.
		-->
		{#snippet children(k)}
			<Svg>
				<AxisX tickMarks baseline snapLabels />
				<AxisY tickMarks gridlines={false} />
				<Bar />
				<!-- Bars run left and right from here, so mark it -->
				<line class="zero" x1={k.xScale(0)} x2={k.xScale(0)} y1={k.yRange[0]} y2={k.yRange[1]} />
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
