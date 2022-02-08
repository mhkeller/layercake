<script>
	import { LayerCake, Html } from 'layercake';

	import CirclePack from '../../_components/CirclePack.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/fruitGroups.csv';

	const idKey = 'fruit';
	const valueKey = 'value';

	data.forEach(d => {
		d[valueKey] = +d[valueKey];
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
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10, bottom: 20, left: 30 }}
		data={data}
	>
		<Html>
      <CirclePack
        idKey={idKey}
        valueKey={valueKey}
				fill='#ff00cc'
				stroke='#9f0080'
				textColor='#61004e'
				textStroke='#ffdbf8'
				textStrokeWidth={1}
      />
		</Html>
	</LayerCake>
</div>
