<!--
	@component
	Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey). The data must be an object with `nodes` and `links` arrays, the shape [sankey](https://github.com/d3/d3-sankey#sankey) takes.
 -->
<script>
	import * as Sankey from 'd3-sankey';
	import { getLayerCakeContext } from 'layercake';

	/** @typedef {import('d3-sankey').SankeyGraph<any, any>} SankeyGraph */
	/** @typedef {import('d3-sankey').SankeyNodeMinimal<any, any>} SankeyNode */
	/** @typedef {import('d3-sankey').SankeyLinkMinimal<any, any>} SankeyLink */
	/** @typedef {(node: SankeyNode, n: number) => number} SankeyAlignment */
	/** @typedef {(a: SankeyLink, b: SankeyLink) => number} LinkSortFunction */

	/** @type {import('layercake').LayerCakeContext<any, SankeyGraph>} */
	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {(d: any) => string} [getLinkStroke=() => 'rgba(0, 0, 0, .2)'] - Returns the stroke color for a link.
	 * @property {(d: any) => string} [getNodeFill=() => '#333'] - Returns the fill color for a node.
	 * @property {(d: any) => string} [getTextFill=() => '#263238'] - Returns the fill color for a node's label.
	 * @property {number} [nodeWidth=5] - The width of each node in pixels, passed to [sankey.nodeWidth](https://github.com/d3/d3-sankey#sankey_nodeWidth).
	 * @property {number} [nodePadding=10] - The gap between nodes in pixels, passed to [sankey.nodePadding](https://github.com/d3/d3-sankey#sankey_nodePadding).
	 * @property {LinkSortFunction|undefined} [linkSort] - How to sort the links, passed to [sankey.linkSort](https://github.com/d3/d3-sankey#sankey_linkSort).
	 * @property {(d: any) => number | string} [nodeId=d => d.id] - Returns a node's id, passed to [sankey.nodeId](https://github.com/d3/d3-sankey#sankey_nodeId).
	 * @property {SankeyAlignment} [nodeAlign=Sankey.sankeyLeft] - Where the nodes line up, passed to [sankey.nodeAlign](https://github.com/d3/d3-sankey#alignments).
	 */

	/** @type {Props} */
	let {
		getLinkStroke = () => 'rgba(0, 0, 0, .2)',
		getNodeFill = () => '#333',
		getTextFill = () => '#263238',
		nodeWidth = 5,
		nodePadding = 10,
		linkSort = undefined,
		nodeId = d => d.id,
		nodeAlign = Sankey.sankeyLeft
	} = $props();

	const linkPath = Sankey.sankeyLinkHorizontal();

	// The layout writes positions onto the nodes and links, so it gets copies of
	// them and hands back a fresh graph each time. Your data stays as it was.
	let sankeyData = $derived.by(() => {
		const sankey = Sankey.sankey()
			.nodeAlign(nodeAlign)
			.nodeWidth(nodeWidth)
			.nodePadding(nodePadding)
			.nodeId(nodeId)
			.size([k.width, k.height])
			.linkSort(linkSort);
		const graph = {
			nodes: k.data.nodes.map(d => ({ ...d })),
			links: k.data.links.map(d => ({ ...d }))
		};
		return /** @type {SankeyGraph} */ (sankey(graph));
	});

	let fontSize = $derived(k.width <= 320 ? 8 : 12);
</script>

<g class="sankey-layer">
	<g class="link-group">
		{#each sankeyData.links as d}
			<path
				d={linkPath(d)}
				fill="none"
				stroke={getLinkStroke(d)}
				stroke-opacity="0.5"
				stroke-width={d.width}
			/>
		{/each}
	</g>
	<g class="rect-group">
		{#each sankeyData.nodes as d}
			<rect x={d.x0} y={d.y0} height={d.y1 - d.y0} width={d.x1 - d.x0} fill={getNodeFill(d)} />
			<text
				x={d.x0 < k.width / 4 ? d.x1 + 6 : d.x0 - 6}
				y={(d.y1 + d.y0) / 2}
				dy={fontSize / 2 - 2}
				style="fill: {getTextFill(d)};
							font-size: {fontSize}px;
							text-anchor: {d.x0 < k.width / 4 ? 'start' : 'end'};"
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
