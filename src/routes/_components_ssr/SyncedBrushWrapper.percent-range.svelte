<script>
	import SyncedBrushWrapper from '../../_components/SyncedBrushWrapper.percent-range.svelte';

	// The CSV rows are parsed, and their numbers typed, by @rollup/plugin-dsv. See vite.config.js
	import pointsOne from '../../_data/points.csv';
	import pointsTwo from '../../_data/pointsTwo.csv';

	// One brush range shared by both charts
	/** @type {[number|null, number|null]} */
	let brushExtents = $state([null, null]);

	const xKey = 'myX';
	const yKey = 'myY';

	const datasets = [pointsOne, pointsTwo];
	const colors = ['#00e047', '#00bbff'];
</script>

<div class="chart-container">
	{#each datasets as dataset, i}
		<SyncedBrushWrapper
			data={dataset}
			{xKey}
			{yKey}
			bind:min={brushExtents[0]}
			bind:max={brushExtents[1]}
			stroke={colors[i]}
		/>
	{/each}
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
		display: flex;
		justify-content: space-between;
	}
	.chart-container :global(.chart-wrapper) {
		height: 100%;
	}
</style>
