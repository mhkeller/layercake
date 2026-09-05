<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal, scaleBand } from 'd3-scale';

	import CirclePackForce from '../../_components/CirclePackForce.svelte';

	// Rows of { category, value }
	import data from '../../_data/dots.json';

	const xKey = 'category';
	const rKey = 'value';
	const cKey = 'category';

	let groupByX = $state(true);

	const seriesColors = ['#ff00cc', '#00ccff', '#ffcc00'];

	const manyBodyStrength = 3;
	const xStrength = 0.1;
</script>

<div class="input-container">
	<label><input type="radio" bind:group={groupByX} value={true} />Group by category</label>
	<label><input type="radio" bind:group={groupByX} value={false} />Clump together</label>
</div>

<div class="chart-container">
	<LayerCake
		x={xKey}
		r={rKey}
		c={cKey}
		xScale={scaleBand()}
		rRange={[3, 12]}
		cScale={scaleOrdinal()}
		cRange={seriesColors}
		{data}
	>
		<Svg>
			<CirclePackForce {manyBodyStrength} {xStrength} {groupByX} stroke="#000" />
		</Svg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
	label {
		cursor: pointer;
	}
	input {
		margin-right: 7px;
	}
</style>
