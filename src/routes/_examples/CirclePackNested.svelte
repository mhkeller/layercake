<script>
	import { LayerCake, Html } from 'layercake';

	import CirclePack from '../../_components/CirclePack.html.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import data from '../../_data/familyTree.csv';

	const idKey = 'name';
	const parentKey = 'parent';
</script>

<div class="chart-container">
	<LayerCake padding={{ bottom: 20, left: 30 }} {data}>
		<Html>
			<!-- Draw the deepest circles last so they sit on top, and show labels only on hover -->
			<CirclePack
				{idKey}
				{parentKey}
				spacing={5}
				sortBy={(a, b) => b.depth - a.depth}
				isLabelVisible={() => false}
				stroke="#00bbff"
			/>
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
