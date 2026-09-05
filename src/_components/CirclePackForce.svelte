<!--
	@component
	Generates an SVG force simulation using [d3-force](https://github.com/d3/d3-force). The values here are defaults which you will likely have to customize because every force simulation is different. This technique comes from @plmrry.
 -->
<script>
	import { forceSimulation, forceX, forceManyBody, forceCollide, forceCenter } from 'd3-force';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [manyBodyStrength=5] - The value passed into the `.strength` method on `forceManyBody`, which is used as the `'charge'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#manyBody_strength) for more.
	 * @property {number} [xStrength=0.1] - The value passed into the `.strength` method on `forceX`, which is used as the `'x'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#x_strength) for more.
	 * @property {string|undefined} [nodeColor] - Set a color manually otherwise it will default to the `cScale`.
	 * @property {string} [nodeStroke='#fff'] - The circle's stroke color.
	 * @property {number} [nodeStrokeWidth=1] - The circle's stroke width, in pixels.
	 * @property {boolean} [groupBy=true] - Group the nodes by the return value of the x-scale. If `false`, align all the nodes to the canvas center.
	 */

	/** @type {Props} */
	let {
		manyBodyStrength = 5,
		xStrength = 0.1,
		nodeColor,
		nodeStroke = '#fff',
		nodeStrokeWidth = 1,
		groupBy = true
	} = $props();

	// Make a copy because the simulation will alter the objects
	const initialNodes = k.data.map(d => ({ ...d }));

	const simulation = forceSimulation(initialNodes);

	let nodes = $state([]);

	simulation.on('tick', () => {
		nodes = simulation.nodes();
	});

	// When variables change, set forces and restart the simulation
	$effect(() => {
		simulation
			.force(
				'x',
				forceX()
					.x(
						/** @param {any} d */ d => {
							return groupBy === true ? k.xGet(d) + k.xScale.bandwidth() / 2 : k.width / 2;
						}
					)
					.strength(xStrength)
			)
			.force('center', forceCenter(k.width / 2, k.height / 2))
			.force('charge', forceManyBody().strength(manyBodyStrength))
			.force(
				'collision',
				forceCollide().radius(
					/** @param {any} d */ d => {
						return k.rGet(d) + nodeStrokeWidth / 2; // Divide this by two because an svg stroke is drawn halfway out
					}
				)
			)
			.force('center', forceCenter(k.width / 2, k.height / 2))
			.alpha(1)
			.restart();
	});
</script>

{#each nodes as point}
	<circle
		class="node"
		r={k.rGet(point)}
		fill={nodeColor ?? k.cGet?.(point) ?? '#00bbff'}
		stroke={nodeStroke}
		stroke-width={nodeStrokeWidth}
		cx={point.x}
		cy={point.y}
	>
		<!-- <title>{point[$custom.title]}</title> -->
	</circle>
{/each}
