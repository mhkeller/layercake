<!--
	@component
	Generates an HTML Beeswarm chart using a [d3-force simulation](https://github.com/d3/d3-force).
 -->
<script>
	import { run } from 'svelte/legacy';

	import { getContext } from 'svelte';
	import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

	const { data, xGet, height, zGet } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=4] - The circle radius size in pixels.
	 * @property {number} [strokeWidth=0.5] - The circle's stroke width in pixels.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [xStrength=0.95] - The value passed into the `.strength` method on `forceX`, which is used as the `'x'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#x_strength) for more.
	 * @property {number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`, which is used as the `'y'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#y_strength) for more.
	 * @property {Function} [getTitle] - An accessor function to get the field on the data element to display as a hover label. Mostly useful for debugging, needs better styling for production.
	 */

	/** @type {Props} */
	let {
		r = 4,
		strokeWidth = 0.5,
		stroke = '#fff',
		xStrength = 0.95,
		yStrength = 0.075,
		getTitle
	} = $props();

	let simulation = $derived(
		forceSimulation($data.map(d => ({ ...d })))
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
			.stop()
	);

	$effect(() => {
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
