<!--
	@component
	Generates an SVG beeswarm chart, using a [d3-force simulation](https://github.com/d3/d3-force) to spread the circles apart.
 -->
<script>
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=4] - The circle radius in pixels.
	 * @property {number} [strokeWidth=1] - The circle's stroke width in pixels.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [xStrength=0.95] - How hard each circle is pulled toward its x value. See [forceX.strength](https://github.com/d3/d3-force#x_strength).
	 * @property {number} [yStrength=0.075] - How hard each circle is pulled toward the vertical middle of the chart. See [forceY.strength](https://github.com/d3/d3-force#y_strength).
	 * @property {(d: any) => string} [getTitle] - Returns hover text for a row, shown in a `<title>` tag.
	 */

	/** @type {Props} */
	let {
		r = 4,
		strokeWidth = 1,
		stroke = '#fff',
		xStrength = 0.95,
		yStrength = 0.075,
		getTitle
	} = $props();

	// Run the simulation to the end up front so the circles come out settled.
	// The simulation mutates its nodes, so it gets copies of the rows.
	/** @type {Array<any>} */
	let nodes = $derived.by(() => {
		if (!k.width || !k.height || !k.data.length) return [];

		const simulation = forceSimulation(k.data.map(d => ({ ...d })))
			.force('x', forceX().x(k.xGet).strength(xStrength))
			.force(
				'y',
				forceY()
					.y(k.height / 2)
					.strength(yStrength)
			)
			.force('collide', forceCollide(r))
			.stop();

		// Tick as many times as the simulation would on its own before it cools off
		const iterations = Math.ceil(
			Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
		);
		for (let i = 0; i < iterations; i += 1) {
			simulation.tick();
		}

		return simulation.nodes();
	});
</script>

<g class="bee-group">
	{#each nodes as node}
		<circle
			fill={k.cGet?.(node) ?? '#ccc'}
			{stroke}
			stroke-width={strokeWidth}
			cx={node.x}
			cy={node.y}
			{r}
		>
			{#if getTitle}
				<title>{getTitle(node)}</title>
			{/if}
		</circle>
	{/each}
</g>
