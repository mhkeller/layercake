<!--
	@component

 -->
<script>
	import { run } from 'svelte/legacy';

	// Based on this example https://observablehq.com/@d3/force-directed-graph
	import { getContext } from 'svelte';
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

	const { data, width, height, zGet, x } = getContext('LayerCake');

	
	
	/**
	 * @typedef {Object} Props
	 * @property {number} [linkDistance] - --------------------------------------------
Here are some values to play with, but most every force layout
is going be unique and this component will need to be customized
See more: https://github.com/d3/d3-force/blob/master/README.md
	 * @property {number} [nodeRadius]
	 * @property {any} [manyBodyStrength]
	 * @property {any} [nodeColor] - --------------------------------------------
Set a manual color, otherwise it will default to using the zScale
	 * @property {string} [linkColor]
	 * @property {number} [linkOpacity]
	 * @property {string} [nodeStrokeColor]
	 * @property {number} [nodeStrokeWidth]
	 * @property {number} [ticks]
	 */

	/** @type {Props} */
	let {
		linkDistance = 30,
		nodeRadius = 5,
		manyBodyStrength = -30,
		nodeColor = undefined,
		linkColor = '#999',
		linkOpacity = 0.6,
		nodeStrokeColor = '#fff',
		nodeStrokeWidth = 1,
		ticks = 150
	} = $props();

	let nodes = $state($data.nodes);
	let links = $state($data.links);

	let simulation = $derived(forceSimulation($data.nodes)
		.force('link', forceLink($data.links).id($x).distance(linkDistance))
		.force('charge', forceManyBody().strength(manyBodyStrength))
		.force('center', forceCenter($width / 2, $height / 2))
		// .on('tick', simulationUpdate)
		.stop());

	// $: {
	// 	for ( let i = 0; i < ticks; i += 1 ) {
	// 		requestAnimationFrame(() => {
	// 			simulation.tick();
	// 			nodes = [...nodes];
	// 			links = [...links];
	// 		});
	// 	}
	// }

	function simulationUpdate(i) {
		simulation.tick();
		nodes = [...nodes];
		links = [...links];
		if (i >= ticks) {
			simulation.stop();
		} else {
			requestAnimationFrame(() => {
				simulationUpdate(++i);
			});
		}
	}

	run(() => {
		if (simulation) {
			simulationUpdate(0);
		}
	});
</script>

{#each links as link}
	<g stroke={linkColor} stroke-opacity={linkOpacity}>
		<line x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y}>
			<title>{$x(link.source)}</title>
		</line>
	</g>
{/each}

{#each nodes as point}
	<circle
		class="node"
		r={nodeRadius}
		fill={nodeColor || $zGet(point)}
		stroke-width={nodeStrokeWidth}
		stroke={nodeStrokeColor}
		cx={point.x}
		cy={point.y}
	>
		<title>{$x(point)}</title>
	</circle>
{/each}
