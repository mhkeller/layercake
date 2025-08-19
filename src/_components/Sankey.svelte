<!--
	@component
	Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey).
 -->
<script>
	import { getContext } from 'svelte';
	import * as Sankey from 'd3-sankey';

	const { data, width, height } = getContext('LayerCake');

	/**
	 * @typedef {(
	 *   import('d3-sankey').sankeyLeft |
	 *   import('d3-sankey').sankeyRight |
	 *   import('d3-sankey').sankeyCenter |
	 *   import('d3-sankey').sankeyJustify
	 * )} SankeyAlignment
	 */

	/** @typedef {import('d3-sankey').SankeyGraph} SankeyGraph */

	/** @typedef {import('d3-sankey').SankeyNodeMinimal} SankeyNodeMinimal */

	/** @typedef {import('d3-sankey').SankeyLinkMinimal} SankeyLink */

	/**
	 * @typedef {((a: SankeyLink, b: SankeyLink) => (number | undefined | null))} LinkSortFunction
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Function} [colorLinks=() => 'rgba(0, 0, 0, .2)'] - A function to return a color for the links.
	 * @property {Function} [colorNodes=() => '#333'] - A function to return a color for each node.
	 * @property {Function} [colorText=() => '#263238'] - A function to return a color for each text label.
	 * @property {number} [nodeWidth=5] - The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth).
	 * @property {number} [nodePadding=10] - The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding).
	 * @property {LinkSortFunction|undefined} [linkSort] - How to sort the links, passed to [`sankey.linkSort`](https://github.com/d3/d3-sankey#sankey_linkSort).
	 * @property {(SankeyNodeMinimal) => number | string} [nodeId=(d) => d.id] - The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId).
	 * @property {SankeyAlignment} [nodeAlign=Sankey.sankeyLeft] - An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more.
	 */

	/** @type {Props} */
	let {
		colorLinks = () => 'rgba(0, 0, 0, .2)',
		colorNodes = () => '#333',
		colorText = () => '#263238',
		nodeWidth = 5,
		nodePadding = 10,
		linkSort = undefined,
		nodeId = d => d.id,
		nodeAlign = Sankey.sankeyLeft
	} = $props();

	const link = Sankey.sankeyLinkHorizontal();

	/** @type {SankeyGraph|{links: any, nodes: any}} sankeyData */
	let sankeyData = $state({ links: undefined, nodes: undefined });
	$effect(() => {
		const sankey = Sankey.sankey()
			.nodeAlign(nodeAlign)
			.nodeWidth(nodeWidth)
			.nodePadding(nodePadding)
			.nodeId(nodeId)
			.size([$width, $height])
			.linkSort(linkSort);

		sankeyData = sankey($data);
	});

	let fontSize = $derived($width <= 320 ? 8 : 12);
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
