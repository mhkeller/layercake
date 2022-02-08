<script>
	import { LayerCake, Html } from 'layercake';

	import Scatter from '../../_components/Scatter.html.svelte';
	import AxisX from '../../_components/AxisX.html.svelte';
	import AxisY from '../../_components/AxisY.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	const r = 4.5;
	const padding = 2.5;
	const fill = '#fff';
	const stroke = '#0cf';
	const strokeWidth = 1.5;
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		data={data}
	>

		<Html>
			<AxisX/>
			<AxisY/>
			<Scatter
				{r}
				{fill}
				{stroke}
				{strokeWidth}
			/>
		</Html>

	</LayerCake>
</div>
