<!--
	@component
	Generates SVG circles laid out by a [d3-force](https://github.com/d3/d3-force) simulation, sized by the `r` scale and pulled toward their x position. The default strengths are a starting point. Every simulation needs its own tuning.
 -->
<script>
	import { forceSimulation, forceX, forceManyBody, forceCollide, forceCenter } from 'd3-force';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [manyBodyStrength=5] - How strongly circles push each other apart. A negative value pulls them together. See [forceManyBody.strength](https://github.com/d3/d3-force#manyBody_strength).
	 * @property {number} [xStrength=0.1] - How hard each circle is pulled toward its x position. See [forceX.strength](https://github.com/d3/d3-force#x_strength).
	 * @property {string|undefined} [fill] - The circle's fill color. Defaults to the `c` scale's color.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width in pixels.
	 * @property {boolean} [groupByX=true] - Pull each circle toward its x position. If `false`, pull them all toward the chart's centre.
	 */

	/** @type {Props} */
	let {
		manyBodyStrength = 5,
		xStrength = 0.1,
		fill,
		stroke = '#fff',
		strokeWidth = 1,
		groupByX = true
	} = $props();

	/** @type {Array<any>} */
	let nodes = $state([]);

	// One simulation for the life of the component. Every tick copies its positions out.
	const simulation = forceSimulation().on('tick', () => {
		nodes = simulation.nodes();
	});

	// Rerun whenever the rows, the chart size or a prop changes. New rows get fresh
	// copies, since the simulation writes x and y onto them. Anything else keeps the
	// current positions and only swaps the forces, so the circles drift rather than jump.
	/** @type {Array<any>|undefined} */
	let currentRows;
	$effect(() => {
		if (k.data !== currentRows) {
			currentRows = k.data;
			simulation.nodes(k.data.map(d => ({ ...d })));
		}
		simulation
			.force(
				'x',
				forceX()
					.x(
						/** @param {any} d */ d => {
							return groupByX === true ? k.xGet(d) + k.xScale.bandwidth() / 2 : k.width / 2;
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
						// Half the stroke sits outside the circle, so add half of it to the radius
						return (k.rGet?.(d) ?? 5) + strokeWidth / 2;
					}
				)
			)
			.alpha(1)
			.restart();

		// Stop ticking when the component goes away
		return () => simulation.stop();
	});
</script>

{#each nodes as point}
	<circle
		class="node"
		r={k.rGet?.(point) ?? 5}
		fill={fill ?? k.cGet?.(point) ?? '#00bbff'}
		{stroke}
		stroke-width={strokeWidth}
		cx={point.x}
		cy={point.y}
	></circle>
{/each}
