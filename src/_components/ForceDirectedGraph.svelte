<!--
	@component

 -->
<script>
	// Based on this example https://observablehq.com/@d3/force-directed-graph
	import { getContext } from 'svelte';
	import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force';

	const { data, width, height, zGet, x } = getContext('LayerCake');

	/* --------------------------------------------
	 * Here are some values to play with, but most every force layout
	 * is going be unique and this component will need to be customized
	 * See more: https://github.com/d3/d3-force/blob/master/README.md
	 */
	export let linkDistance = 30;
	export let nodeRadius = 5;
	export let manyBodyStrength = -30;
	/* --------------------------------------------
	 * Set a manual color, otherwise it will default to using the zScale
	 */
	export let nodeColor = undefined;
	export let linkColor = '#999';
	export let linkOpacity = 0.6;
	export let nodeStrokeColor = '#fff';
	export let nodeStrokeWidth = 1;
	export let ticks = 150;

	let nodes = $data.nodes;
	let links = $data.links;

	$: simulation = forceSimulation($data.nodes)
		.force('link', forceLink($data.links).id($x).distance(linkDistance))
		.force('charge', forceManyBody().strength(manyBodyStrength))
		.force('center', forceCenter($width / 2, $height / 2))
		// .on('tick', simulationUpdate)
		.stop();

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

	$: if (simulation) {
		simulationUpdate(0);
	}
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
