<!--
	@component
	Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet } = getContext('LayerCake');

	const nodes = $data.map(d => ({ ...d }));

	/**
	 * @typedef {Object} Props
	 * @property {Number} [r] - The circle radius size in pixels.
	 * @property {Number} [strokeWidth] - The circle's stroke width in pixels.
	 * @property {String} [stroke] - The circle's stroke color.
	 * @property {Number} [xStrength] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength).
	 * @property {Number} [yStrength] - The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength).
	 * @property {Function|undefined} [getTitle] - An accessor function to get the field on the data element to display as a hover label using a `<title>` tag.
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

	let simulation = $derived(
		forceSimulation(nodes)
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
			.stop()
	);

	run(() => {
		for (
			let i = 0,
				n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
			i < n;
			++i
		) {
			simulation.tick();
		}
	});
</script>

<g class="bee-group">
	{#each simulation.nodes() as node}
		<circle fill={$zGet(node)} {stroke} stroke-width={strokeWidth} cx={node.x} cy={node.y} {r}>
			{#if getTitle}
				<title>{getTitle(node)}</title>
			{/if}
		</circle>
	{/each}
</g>
