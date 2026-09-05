<!--
	@component
	Generates a tooltip that works on multiseries datasets, like multiline charts. It creates a tooltip showing the name of the series and the current value. This version uses percentages so you can use it to render server-side. It finds the nearest data point using the [QuadTree.percent-range.html.svelte](https://layercake.graphics/components/QuadTree.percent-range.html.svelte) component.
 -->
<script>
	import { format } from 'd3-format';
	import { getLayerCakeContext } from 'layercake';

	import QuadTree from './QuadTree.percent-range.html.svelte';

	const k = getLayerCakeContext();

	const commas = format(',');
	/** @param {string} d */
	const capitalizeFirst = d => d.replace(/^\w/, w => w.toUpperCase());

	/**
	 * @typedef {Object} Props
	 * @property {(d: any) => string} [formatTitle=d => d] - Formats the tooltip title, the hovered row's x value.
	 * @property {(d: any) => string} [formatValue=d => (isNaN(+d) ? d : commas(d))] - Formats a series value.
	 * @property {(d: any) => string} [formatKey=d => capitalizeFirst(d)] - Formats a series name.
	 * @property {number} [offset=-20] - A y-offset from the hover point, in pixels.
	 * @property {Array<Object>|undefined} [dataset] - Rows to search, defaulting to `k.data`. Pass your own list when the chart data is nested or reshaped.
	 */

	/** @type {Props} */
	let {
		formatTitle = d => d,
		formatValue = d => (isNaN(+d) ? d : commas(d)),
		formatKey = d => capitalizeFirst(d),
		offset = -20,
		dataset
	} = $props();

	const tooltipWidth = 150;
	const halfTooltipWidth = tooltipWidth / 2;

	// Sort the series by value, highest first, leaving out the x field
	/** @param {Record<string, any>} result */
	function sortResult(result) {
		if (Object.keys(result).length === 0) return [];
		const rows = Object.keys(result)
			.filter(d => d !== k.config.x)
			.map(key => {
				return {
					key,
					value: result[key]
				};
			})
			.sort((a, b) => b.value - a.value);

		return rows;
	}
</script>

<QuadTree dataset={dataset || k.data} y="x">
	{#snippet children({ x, visible, found })}
		{@const foundSorted = sortResult(found)}
		{#if visible === true}
			<div style="left:{(x / 100) * k.width}px;" class="line"></div>
			<div
				class="tooltip"
				style="
	        width:{tooltipWidth}px;
	        top:calc({k.yScale(foundSorted[0].value)}% + {offset}px);
	        left:{Math.min(
					Math.max(halfTooltipWidth, (x / 100) * k.width),
					k.width - halfTooltipWidth
				)}px;"
			>
				<div class="title">{formatTitle(found[k.config.x])}</div>
				{#each foundSorted as row}
					<div class="row">
						<span class="key">{formatKey(row.key)}:</span>
						{formatValue(row.value)}
					</div>
				{/each}
			</div>
		{/if}
	{/snippet}
</QuadTree>

<style>
	.tooltip {
		position: absolute;
		font-size: 13px;
		pointer-events: none;
		border: 1px solid #ccc;
		background: rgba(255, 255, 255, 0.85);
		transform: translate(-50%, -100%);
		padding: 5px;
		z-index: 15;
	}
	.line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		border-left: 1px dotted #666;
		pointer-events: none;
	}
	.tooltip,
	.line {
		transition:
			left 250ms ease-out,
			top 250ms ease-out;
	}
	.title {
		font-weight: bold;
	}
	.key {
		color: #999;
	}
</style>
