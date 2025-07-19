<!--
	@component
	Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { getContext, untrack } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, width, height, zGet } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=4] - The circle radius size in pixels.
	 * @property {number} [strokeWidth=1] - The circle's stroke width in pixels.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength).
	 * @property {number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength).
	 * @property {Function} [getTitle] - An accessor function to get the field on the data element to display as a hover label using a `<title>` tag.
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

	/** @type {any[]} */
	let nodes = $state([]);

	let simulation = $derived.by(() => {
		if (!$width || !$height || !$data.length) return null;

		const sim = forceSimulation($data.map((/** @type {any} */ d) => ({ ...d })))
			.force(
				'x',
				forceX()
					.x(d => $xGet(d))
					.strength(xStrength)
			)
			.force(
				'y',
				forceY()
					.y($height / 2)
					.strength(yStrength)
			)
			.force('collide', forceCollide(r))
			.stop();

		return sim;
	});

	$effect(() => {
		if (!simulation) {
			nodes = [];
			return;
		}

		untrack(() => {
			// Run the simulation for a fixed number of iterations
			const maxIterations = Math.ceil(
				Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
			);

			for (let i = 0; i < maxIterations; ++i) {
				simulation.tick();
			}

			// Update nodes state to trigger reactivity
			nodes = [...simulation.nodes()];
		});
	});
</script>

<g class="bee-group">
	{#each nodes as node}
		<circle fill={$zGet(node)} {stroke} stroke-width={strokeWidth} cx={node.x} cy={node.y} {r}>
			{#if getTitle}
				<title>{getTitle(node)}</title>
			{/if}
		</circle>
	{/each}
</g>
