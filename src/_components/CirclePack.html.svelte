<!--
	@component
	Generates an HTML circle pack chart using [d3-hierarchy](https://github.com/d3/d3-hierarchy).
 -->
<script>
	import { stratify, pack, hierarchy } from 'd3-hierarchy';
	import { format } from 'd3-format';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/** @param {string} d */
	const capitalizeFirst = d => d.replace(/^\w/, w => w.toUpperCase());
	const commas = format(',');

	/** @typedef {import('d3-hierarchy').HierarchyNode<any>} HierarchyNode */

	/**
	 * @typedef {Object} Props
	 * @property {string} [idKey='id'] - The field holding each row's id.
	 * @property {string} [parentKey] - The field holding each row's parent id. Set it for a [nested](https://layercake.graphics/example/CirclePackNested) chart. Leave it unset to pack every row into one circle, as in the [grouping example](https://layercake.graphics/example/CirclePack).
	 * @property {string} [valueKey='value'] - The field holding each row's value, which sets its circle's area.
	 * @property {(r: number) => boolean} [isLabelVisible=r => r > 25] - Whether a circle of radius `r` shows its label inside it. Smaller circles show the label on hover instead.
	 * @property {string} [fill='#fff'] - The circle's fill color.
	 * @property {string} [stroke='#999'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width, in pixels.
	 * @property {string} [textFill='#333'] - The label text color.
	 * @property {string} [textStroke='#000'] - The label text's stroke color.
	 * @property {number} [textStrokeWidth=0] - The label text's stroke width, in pixels.
	 * @property {(a: HierarchyNode, b: HierarchyNode) => number} [sortBy=(a, b) => (b.value ?? 0) - (a.value ?? 0)] - The order circles are drawn in, as a comparator on hierarchy nodes. Sorting on `depth` is another common choice.
	 * @property {number} [spacing=0] - Whitespace between circles in pixels.
	 */

	/** @type {Props} */
	let {
		idKey = 'id',
		parentKey,
		valueKey = 'value',
		isLabelVisible = r => r > 25,
		fill = '#fff',
		stroke = '#999',
		strokeWidth = 1,
		textFill = '#333',
		textStroke = '#000',
		textStrokeWidth = 0,
		sortBy = (a, b) => (b.value ?? 0) - (a.value ?? 0),
		spacing = 0
	} = $props();

	// If no `parentKey` was passed in, every row gets put under one made-up
	// parent called 'all'. That parent is added to a copy of the data here.
	let parent = $derived(parentKey !== undefined ? {} : { [idKey]: 'all' });
	let dataset = $derived(parentKey !== undefined ? k.data : [...k.data, parent]);

	let stratifier = $derived(
		stratify()
			.id(d => d[idKey])
			.parentId(d => {
				if (d[idKey] === parent[idKey]) return '';
				if (parentKey === undefined) return parent[idKey];
				return d[parentKey];
			})
	);

	let descendants = $derived(
		pack()
			.size([k.width, k.height])
			.padding(spacing)(
				hierarchy(stratifier(dataset))
					.sum(d => {
						return d.data[valueKey] || 1;
					})
					.sort(sortBy)
			)
			.descendants()
	);
</script>

<div class="circle-pack" data-has-parent-key={parentKey !== undefined}>
	{#each descendants as d}
		<div class="circle-group" data-id={d.data.id} data-visible={isLabelVisible(d.r)}>
			<div
				class="circle"
				style:left="{d.x}px"
				style:top="{d.y}px"
				style:width="{d.r * 2}px"
				style:height="{d.r * 2}px"
				style:background-color={fill}
				style:border="{strokeWidth}px solid {stroke}"
			></div>
			<div
				class="text-group"
				style="
						color:{textFill};
						text-shadow:
							-{textStrokeWidth}px -{textStrokeWidth}px 0 {textStroke},
							{textStrokeWidth}px -{textStrokeWidth}px 0 {textStroke},
							-{textStrokeWidth}px {textStrokeWidth}px 0 {textStroke},
							{textStrokeWidth}px {textStrokeWidth}px 0 {textStroke};
						left:{d.x}px;
						top:{d.y - (isLabelVisible(d.r) ? 0 : d.r + 4)}px;
					"
			>
				<div class="text">{capitalizeFirst(d.data.id)}</div>
				{#if d.data.data[valueKey]}
					<div class="text value">{commas(d.data.data[valueKey])}</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.circle-pack {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.circle,
	.text-group {
		position: absolute;
	}
	.circle {
		transform: translate(-50%, -50%);
	}
	/* Hide the made-up 'all' root circle when the component created it */
	.circle-pack[data-has-parent-key='false'] .circle-group[data-id='all'] {
		display: none;
	}
	.circle-group[data-visible='false'] .text-group {
		display: none;
		padding: 4px 7px;
		background: #fff;
		border: 1px solid #ccc;
		transform: translate(-50%, -100%);
		top: -4px;
	}
	.circle-group[data-visible='false']:hover .text-group {
		z-index: 999;
		display: block !important;
		text-shadow: none !important;
		color: #000 !important;
	}
	.circle-group[data-visible='false']:hover .circle {
		border-color: #000 !important;
	}
	.text-group {
		width: auto;
		top: 50%;
		left: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
		white-space: nowrap;
		pointer-events: none;
		cursor: pointer;
		line-height: 13px;
	}
	.text {
		width: 100%;
		font-size: 11px;
	}
	.text.value {
		font-size: 11px;
	}
	.circle {
		border-radius: 50%;
		top: 0;
		left: 0;
	}
</style>
