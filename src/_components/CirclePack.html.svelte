<!--
	@component
	Generates an HTML circle pack chart using [d3-hierarchy](https://github.com/d3/d3-hierarchy).
 -->
<script>
	import { stratify, pack, hierarchy } from 'd3-hierarchy';
	import { getContext } from 'svelte';
	import { format } from 'd3-format';

	const { width, height, data } = getContext('LayerCake');

	/** @type {String} [idKey='id'] - The key on each object where the id value lives. */
	export let idKey = 'id';

	/** @type {String} [parentKey] - Set this if you want to define one parent circle. This will give you a [nested](https://layercake.graphics/example/CirclePackNested) graphic versus a [grouping of circles](https://layercake.graphics/example/CirclePack). */
	export let parentKey = undefined;

	/** @type {String} [valueKey='value'] - The key on each object where the data value lives. */
	export let valueKey = 'value';

	/** @type {Function} [labelVisibilityThreshold=r => r > 25] - By default, only show the text inside a circle if its radius exceeds a certain size. Provide your own function for different behavior. */
	export let labelVisibilityThreshold = r => r > 25;

	/** @type {String} [fill='#fff'] - The circle's fill color. */
	export let fill = '#fff';

	/** @type {String} [stroke='#999'] - The circle's stroke color. */
	export let stroke = '#999';

	/** @type {Number} [strokeWidth=1] - The circle's stroke width, in pixels. */
	export let strokeWidth = 1;

	/** @type {String} [textColor='#333'] - The label text color. */
	export let textColor = '#333';

	/** @type {String} [textStroke='#000'] - The label text's stroke color. */
	export let textStroke = '#000';

	/** @type {Number} [textStrokeWidth=0] - The label text's stroke width, in pixels. */
	export let textStrokeWidth = 0;

	/** @type {Function} [sortBy=(a, b) => b.value - a.value] - The order in which circle's are drawn. Sorting on the `depth` key is also a popular choice. */
	export let sortBy = (a, b) => b.value - a.value; // 'depth' is also a popular choice

	/** @type {Number} [spacing=0] - Whitespace padding between each circle, in pixels. */
	export let spacing = 0;

	/* --------------------------------------------
	 * This component will automatically group your data
	 * into one group if no `parentKey` was passed in.
	 * Stash $data here so we can add our own parent
	 * if there's no `parentKey`
	 */
	let parent = {};
	$: dataset = $data;

	$: if (parentKey === undefined) {
		parent = { [idKey]: 'all' };
		dataset = [...dataset, parent];
	}

	$: stratifier = stratify()
		.id(d => d[idKey])
		.parentId(d => {
			if (d[idKey] === parent[idKey]) return '';
			return d[parentKey] || parent[idKey];
		});

	$: packer = pack().size([$width, $height]).padding(spacing);

	$: stratified = stratifier(dataset);

	$: root = hierarchy(stratified)
		.sum((d, i) => {
			return d.data[valueKey] || 1;
		})
		.sort(sortBy);

	$: packed = packer(root);

	$: descendants = packed.descendants();

	const titleCase = d => d.replace(/^\w/, w => w.toUpperCase());
	const commas = format(',');
</script>

<div class="circle-pack" data-has-parent-key={parentKey !== undefined}>
	{#each descendants as d}
		<div class="circle-group" data-id={d.data.id} data-visible={labelVisibilityThreshold(d.r)}>
			<div
				class="circle"
				style="left:{d.x}px;top:{d.y}px;width:{d.r * 2}px;height:{d.r *
					2}px;background-color:{fill};border: {strokeWidth}px solid {stroke};"
			/>
			<div
				class="text-group"
				style="
						color:{textColor};
						text-shadow:
							-{textStrokeWidth}px -{textStrokeWidth}px 0 {textStroke},
							{textStrokeWidth}px -{textStrokeWidth}px 0 {textStroke},
							-{textStrokeWidth}px {textStrokeWidth}px 0 {textStroke},
							{textStrokeWidth}px {textStrokeWidth}px 0 {textStroke};
						left:{d.x}px;
						top:{d.y - (labelVisibilityThreshold(d.r) ? 0 : d.r + 4)}px;
					"
			>
				<div class="text">{titleCase(d.data.id)}</div>
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
	/* Hide the root node if we want, useful if we are creating our own root */
	.circle-pack[data-has-parent-key='false'] .circle-group[data-id='all'] {
		display: none;
	}
	/* .circle-group:hover {
    z-index: 9999;
  } */
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
		/* On hover, set the text color to black and eliminate the shadow */
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
		/* text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; */
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
