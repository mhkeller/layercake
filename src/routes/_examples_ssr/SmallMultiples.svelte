<script>
	import { calcExtents, flatten } from 'layercake';

	import SmallMultipleWrapper from '../../_components/SmallMultipleWrapper.percent-range.svelte';

	// A list of series, each a list of { x, y } points
	import pointSeries from '../../_data/pointSeries.js';

	/** @type {Record<string, (d: any) => any>} */
	const extentGetters = {
		x: d => d.x,
		y: d => d.y
	};

	// The extents across every series, for the shared scale option
	const fullExtents = calcExtents(flatten(pointSeries), extentGetters);

	// Order the charts by each series' last value, on a copy so the import stays as it is
	const sortedSeries = [...pointSeries].sort((a, b) => b[b.length - 1].y - a[a.length - 1].y);

	/** @type {'shared'|'individual'} */
	let scale = $state('individual');
</script>

<div class="input-container">
	<label><input type="radio" bind:group={scale} value="individual" />Individual scale</label>
	<label><input type="radio" bind:group={scale} value="shared" />Shared scale</label>
</div>

<div class="group-container">
	{#each sortedSeries as data}
		<div class="small-multiple-container">
			<SmallMultipleWrapper {data} {fullExtents} {scale} {extentGetters} />
		</div>
	{/each}
</div>

<style>
	.group-container {
		height: calc(100% - 40px);
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
	/* Give the wrapper a width and height. LayerCake fills it. */
	.small-multiple-container {
		position: relative;
		display: inline-block;
		width: 11%;
		height: 30%;
	}
</style>
