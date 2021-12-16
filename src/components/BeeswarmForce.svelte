<script>
	/**
		Generates an SVG Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
		@type {Number} [r=4] – The circle radius size in pixels.
		@type {Number} [strokeWidth=1] – The circle's stroke width in pixels.
		@type {String} [stroke='#fff'] – The circle's stroke color.
		@type {Number} [xStrength=0.95] – The value passed into the `.strength` method on `forceX`. See [the documentation](https://github.com/d3/d3-force#x_strength).
		@type {Number} [yStrength=0.075] – The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength).
	*/
	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet, custom } = getContext('LayerCake');

	const nodes = $data.map((d) => ({ ...d }));

	export let r = 4;
	export let strokeWidth = 1;
	export let stroke = '#fff';
	export let xStrength = 0.95;
	export let yStrength = 0.075;

	$: simulation = forceSimulation(nodes)
		.force('x', forceX().x(d => $xGet(d)).strength(xStrength))
		.force('y', forceY().y($height / 2).strength(yStrength))
		.force('collide', forceCollide(r))
		.stop();

	$: {
		for ( let i = 0,
			n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
			i < n;
			++i ) {
			simulation.tick();
		}
	}
</script>

<g class='bee-group'>
	{#each simulation.nodes() as node}
		<circle
			fill='{$zGet(node)}'
			stroke='{stroke}'
			stroke-width='{strokeWidth}'
			cx='{node.x}'
			cy='{node.y}'
			r='{r}'
		>
			<title>{$custom.getTitle(node)}</title>
		</circle>
	{/each}
</g>
