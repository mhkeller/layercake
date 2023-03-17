<script>
	import SyncedBrushWrapper from '../../_components/SyncedBrushWrapper.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import pointsOne from '../../_data/points.csv';
	import pointsTwo from '../../_data/pointsTwo.csv';
	import pointsThree from '../../_data/pointsThree.csv';
	import pointsFour from '../../_data/pointsFour.csv';

	let brushExtents = [null, null];

	const xKey = 'myX';
	const yKey = 'myY';

	const datasets = [
		pointsOne,
		pointsTwo,
		pointsThree,
		pointsFour
	];

	datasets.forEach(dataset => {
		dataset.forEach(d => {
			d[yKey] = +d[yKey];
		});
	});

	const colors = ['#00e047', '#00bbff', '#ff00cc', '#ffcc00'];
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
	}
</style>

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
