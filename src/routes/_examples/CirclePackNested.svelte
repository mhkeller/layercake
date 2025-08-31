<script>
	import { LayerCake, Html } from 'layercake';

	import CirclePack from '../../_components/CirclePack.html.svelte';

	// This example loads csv data as json and converts numeric columns to numbers using @rollup/plugin-dsv. See vite.config.js for details
	import data from '../../_data/familyTree.csv';

	const idKey = 'name';
	const parentKey = 'parent';
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 0, bottom: 20, left: 30 }} {data}>
		<Html>
			<CirclePack
				{idKey}
				{parentKey}
				spacing={5}
				sortBy={(a, b) => b.depth - a.depth}
				labelVisibilityThreshold={r => false}
				stroke="#00bbff"
			/>
		</Html>
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
</style>
