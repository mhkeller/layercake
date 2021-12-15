<script>
	import { calcExtents, flatten } from 'layercake';

	import SmallMultipleWrapper from '../../components/SmallMultipleWrapper.percent-range.svelte';

	import pointSeries from '../../data/pointSeries.js';
	/* --------------------------------------------
	 * Grab the extents of the full dataset
	 */
	const extentGetters = {
		x: d => d.x,
		y: d => d.y
	};

	const fullExtents = calcExtents(flatten(pointSeries), extentGetters);

	/* --------------------------------------------
	 * Sort by the last value
	 */
	pointSeries.sort((a, b) => {
		return b[b.length - 1].y - a[a.length - 1].y;
	});

	let scale = 'individual';
</script>

<style>
	.group-container {
		height: 90%;
		width: 100%;
	}
	.input-container {
		margin-bottom: 7px;
	}
	label {
		cursor: pointer;
	}
	input {
		margin-right: 7px;
	}
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		position: relative;
		display: inline-block;
		width: 11%;
		height: 30%;
	}
</style>

<div class="input-container">
	<label><input type="radio" bind:group={scale} value="individual"/>Individual scale</label>
	<label><input type="radio" bind:group={scale} value="shared"/>Shared scale</label>
</div>

<div class="group-container">
	{#each pointSeries as data}
		<div class="chart-container">
			<SmallMultipleWrapper
				{data}
				{fullExtents}
				{scale}
				{extentGetters}
			/>
		</div>
	{/each}
</div>
