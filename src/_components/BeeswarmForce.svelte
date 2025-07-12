<!--
	@component
	Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet } = getContext('LayerCake');

	const nodes = $data.map(d => ({ ...d }));

	/** @type {number} [r=4] - The circle radius size in pixels. */
	export let r = 4;

	/** @type {number} [strokeWidth=1] - The circle's stroke width in pixels. */
	export let strokeWidth = 1;

	/** @type {string} [stroke='#fff'] - The circle's stroke color. */
	export let stroke = '#fff';

	/** @type {number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength). */
	export let xStrength = 0.95;

	/** @type {number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength). */
	export let yStrength = 0.075;

	/** @type {Function|undefined} [getTitle] - An accessor function to get the field on the data element to display as a hover label using a `<title>` tag. */
	export let getTitle = undefined;

	$: simulation = forceSimulation(nodes)
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

	$: {
		for (
			let i = 0,
				n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
			i < n;
			++i
		) {
			simulation.tick();
		}
	}
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
