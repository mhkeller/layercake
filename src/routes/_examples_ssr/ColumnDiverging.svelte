<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { scaleBand } from 'd3-scale';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/yearChanges.csv';

	const xKey = 'year';
	const yKey = 'change';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 10, right: 0, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.05).round(true)}
		c={d => (d[yKey] < 0 ? 'down' : 'up')}
		cDomain={['up', 'down']}
		cRange={['#00e047', '#f0c']}
		{data}
		yDomain={([min, max]) => [Math.min(0, min), Math.max(0, max)]}
	>
		<!--
			The columns grow out of zero, so zero has to be on the axis. A function
			domain gets handed the [min, max] measured from the data and widens
			whichever end is missing zero. The same line works whether your numbers
			are all positive, all negative or a mix of both.

			The `c` scale sorts each row into "up" or "down" and hands the Column
			component a color for it.
		-->
		{#snippet children(k)}
			<Html>
				<AxisX gridlines={false} snapLabels />
				<AxisY ticks={4} />
			</Html>
			<ScaledSvg>
				<Column />
				<!--
					Columns run up and down from here, so mark it. Reading the ends off
					the range keeps this in whatever units the chart uses – percentages
					here, pixels without `percentRange`.
				-->
				<line class="zero" x1={k.xRange[0]} x2={k.xRange[1]} y1={k.yScale(0)} y2={k.yScale(0)} />
			</ScaledSvg>
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
		/* The ScaledSvg stretches to fill its box, so undo that for the stroke */
		vector-effect: non-scaling-stroke;
	}
</style>
