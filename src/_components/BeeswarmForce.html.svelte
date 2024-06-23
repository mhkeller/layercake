<!--
	@component
	Generates an HTML Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet } = getContext('LayerCake');

	const nodes = $data.map(d => ({ ...d }));

	/** @type {Number} [r=4] - The circle radius size in pixels. */
	export let r = 4;

	/** @type {Number} [strokeWidth=0.5] - The circle's stroke width in pixels. */
	export let strokeWidth = 0.5;

	/** @type {String} [stroke='#fff'] - The circle's stroke color. */
	export let stroke = '#fff';

	/** @type {Number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`, which is used as the `'x'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#x_strength) for more. */
	export let xStrength = 0.95;

	/** @type {Number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`, which is used as the `'y'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#y_strength) for more. */
	export let yStrength = 0.075;

	/** @type {Function} [getTitle] — An accessor function to get the field on the data element to display as a hover label. Mostly useful for debugging, needs better styling for production. */
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
		.force('collide', forceCollide(r + strokeWidth / 2))
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

<div class="bee-group">
	{#each simulation.nodes() as node}
		<div
			class="bee"
			style="
				left:{node.x}px;
				top: {node.y}px;
				width: {r * 2}px;
				height: {r * 2}px;
				background: {$zGet(node)};
				border-width: {strokeWidth}px;
				border-color: {stroke};
				"
		>
			{#if getTitle}
				<div class="title">{getTitle(node)}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.bee {
		position: absolute;
		border-style: solid;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	.title {
		display: none;
		white-space: nowrap;
		padding: 0 3px;
		border-radius: 3px;
		font-size: 12px;
		pointer-events: none;
		position: absolute;
		top: -15px;
		left: 5px;
		z-index: 9999;
	}
	.bee:hover .title {
		display: block;
	}
</style>
