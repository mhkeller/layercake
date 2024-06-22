<!--
	@component
	Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey).
 -->
<script>
	import { getContext } from 'svelte';
	import * as Sankey from 'd3-sankey';

	const { data, width, height } = getContext('LayerCake');

	/** @type {Function} [colorLinks=d => 'rgba(0, 0, 0, .2)'] - A function to return a color for the links. */
	export let colorLinks = () => 'rgba(0, 0, 0, .2)';

	/** @type {Function} [colorNodes=d => '#333'] - A function to return a color for each node. */
	export let colorNodes = () => '#333';

	/** @type {Function} [colorText=d => '#263238'] - A function to return a color for each text label. */
	export let colorText = () => '#263238';

	/** @type {Number} [nodeWidth=5] - The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth). */
	export let nodeWidth = 5;

	/** @type {Number} [nodePadding=10] - The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding). */
	export let nodePadding = 10;

	/** @type {Function} [linkSort=null] - How to sort the links, passed to [`sankey.linkSort`](https://github.com/d3/d3-sankey#sankey_linkSort). */
	export let linkSort = null;

	/** @type {Function} [nodeId=d => d.id] - The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId). */
	export let nodeId = d => d.id;

	/** @type {Function} [nodeAlign=d3.sankeyLeft] - An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more. */
	export let nodeAlign = Sankey.sankeyLeft;

	const link = Sankey.sankeyLinkHorizontal();

	$: sankey = Sankey.sankey()
		.nodeAlign(nodeAlign)
		.nodeWidth(nodeWidth)
		.nodePadding(nodePadding)
		.nodeId(nodeId)
		.size([$width, $height])
		.linkSort(linkSort);

	$: sankeyData = sankey($data);

	$: fontSize = $width <= 320 ? 8 : 12;
</script>

<g class="sankey-layer">
	<g class="link-group">
		{#each sankeyData.links as d}
			<path
				d={link(d)}
				fill="none"
				stroke={colorLinks(d)}
				stroke-opacity="0.5"
				stroke-width={d.width}
			/>
		{/each}
	</g>
	<g class="rect-group">
		{#each sankeyData.nodes as d}
			<rect x={d.x0} y={d.y0} height={d.y1 - d.y0} width={d.x1 - d.x0} fill={colorNodes(d)} />
			<text
				x={d.x0 < $width / 4 ? d.x1 + 6 : d.x0 - 6}
				y={(d.y1 + d.y0) / 2}
				dy={fontSize / 2 - 2}
				style="fill: {colorText(d)};
							font-size: {fontSize}px;
							text-anchor: {d.x0 < $width / 4 ? 'start' : 'end'};"
			>
				{d.id}
			</text>
		{/each}
	</g>
</g>

<style>
	text {
		pointer-events: none;
	}
</style>
