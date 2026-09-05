<script>
	import { calcExtents, flatten } from 'layercake';

	import SmallMultipleWrapper from '../../_components/SmallMultipleWrapper.svelte';

	// A list of series, each a list of { x, y } points
	import pointSeries from '../../_data/pointSeries.js';

	/** @type {Record<string, (d: any) => any>} */
	const extentGetters = {
		x: d => d.x,
		y: d => d.y
	};

	// The extents across every series, for the shared scale option
	const fullExtents = calcExtents(flatten(pointSeries), extentGetters);

	/** @type {'shared'|'individual'} */
	let scale = $state('individual');
</script>

<div class="input-container">
	<label><input type="radio" bind:group={scale} value="individual" />scale individual</label>
	<label><input type="radio" bind:group={scale} value="shared" />scale shared</label>
</div>

<div class="group-container">
	{#each pointSeries.slice(0, 8) as data}
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
		margin-right: 10px;
	}
	input {
		margin-right: 7px;
	}
	/* Give the wrapper a width and height. LayerCake fills it. */
	.small-multiple-container {
		position: relative;
		display: inline-block;
		width: 24%;
		height: 50%;
	}
</style>
