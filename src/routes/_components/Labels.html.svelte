<script>
	import { LayerCake, Html } from 'layercake';

	import Labels from '../../_components/Labels.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[xKey] = +d[xKey];
		d[yKey] = +d[yKey];
	})

	const labels = data.filter((d, i) => {
		return i % 6 === 0;
	});

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
		height: 250px;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20, left: 10, right: 10 }}
		x={xKey}
		y={yKey}
		data={data}
	>
		<Html>
			<Labels
				getLabelName={d => d[xKey]}
				{labels}
			/>
		</Html>
	</LayerCake>
</div>
