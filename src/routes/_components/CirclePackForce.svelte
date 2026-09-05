<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal, scaleBand } from 'd3-scale';

	import CirclePackForce from '../../_components/CirclePackForce.svelte';

	import data from '../../_data/dots.json';

	const xKey = 'category';
	const rKey = 'value';
	const cKey = 'category';

	let groupByX = $state(true);

	const seriesNameSet = new Set();
	const seriesColors = ['#ff00cc', '#00ccff', '#ffcc00'];

	data.forEach(d => {
		seriesNameSet.add(d[cKey]);
	});

	// Convert this to an array so we can use it in our scales
	const seriesNames = [...seriesNameSet];

	let manyBodyStrength = 3;
	let xStrength = 0.1;
</script>

<div class="input-container">
	<label><input type="radio" bind:group={groupByX} value={true} />groupByX true</label>
	<label><input type="radio" bind:group={groupByX} value={false} />groupByX false</label>
</div>

<div class="chart-container">
	<LayerCake
		{data}
		x={xKey}
		r={rKey}
		c={cKey}
		xScale={scaleBand()}
		xDomain={seriesNames}
		rRange={[3, 12]}
		cScale={scaleOrdinal()}
		cDomain={seriesNames}
		cRange={seriesColors}
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
