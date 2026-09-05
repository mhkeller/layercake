<!--
	@component
	Generates an HTML x-axis along the bottom of the chart, for server-side rendered charts. If the x scale is a band scale, each tick sits in the middle of its band.

	Positions are percentages when `percentRange={true}` and pixels otherwise, so this also works in a client-side chart with no setup. Set the `units` prop to `'%'` or `'px'` to override that.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks=false] - Show a vertical mark at each tick.
	 * @property {boolean} [gridlines=true] - Show gridlines extending into the chart area.
	 * @property {number} [tickMarkLength=6] - The length of the tick mark.
	 * @property {boolean} [showBaseline=false] - Show a solid line along the bottom of the chart.
	 * @property {boolean} [snapLabels=false] - Instead of centering the text labels on the first and the last items, align them to the edges of the chart.
	 * @property {(d: any) => string} [format=d => d] - Formats a tick value for display.
	 * @property {number|Array<any>|((ticks: Array<any>) => Array<any>)} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function.
	 * @property {number} [tickGutter=0] - The gap in pixels between the bottom of the chart area and the start of the tick.
	 * @property {number} [dx=0] - Horizontal offset of the label in pixels.
	 * @property {number} [dy=0] - Vertical offset of the label in pixels.
	 * @property {'px'|'%'} [units] - Position with pixels or percentages. Defaults to `'%'` when `percentRange={true}`, otherwise `'px'`.
	 */

	/** @type {Props} */
	let {
		tickMarks = false,
		gridlines = true,
		tickMarkLength = 6,
		showBaseline = false,
		snapLabels = false,
		format = d => d,
		ticks = undefined,
		tickGutter = 0,
		dx = 0,
		dy = 0,
		units = k.percentRange === true ? '%' : 'px'
	} = $props();

	let tickLen = $derived(tickMarks === true ? (tickMarkLength ?? 6) : 0);

	let isBandwidth = $derived(typeof k.xScale.bandwidth === 'function');

	/** @type {Array<any>} */
	let tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? k.xScale.domain()
				: typeof ticks === 'function'
					? ticks(k.xScale.ticks())
					: k.xScale.ticks(ticks)
	);

	let halfBand = $derived(isBandwidth ? k.xScale.bandwidth() / 2 : 0);
</script>

<div class="axis x-axis" class:snapLabels>
	{#if showBaseline === true}
		<div class="baseline" style="top:100%; width:100%;"></div>
	{/if}

	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = k.xScale(tick)}

		{#if gridlines === true}
			<div
				class="gridline"
				style:left="{tickValUnits + halfBand}{units}"
				style="top:0; bottom:0;"
			></div>
		{/if}
		{#if tickMarks === true}
			<div
				class="tick-mark"
				style:left="{tickValUnits + halfBand}{units}"
				style:height="{tickLen}px"
				style:bottom="{-tickLen - tickGutter}px"
			></div>
		{/if}
		<div
			class="tick tick-{i}"
			style:left="{tickValUnits + halfBand}{units}"
			style="top:calc(100% + {tickGutter}px);"
		>
			<div
				class="text"
				style:top="{tickLen}px"
				style:transform="translate(calc(-50% + {dx}px), {dy}px)"
			>
				{format(tick)}
			</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 11px;
	}

	.gridline {
		border-left: 1px dashed #aaa;
	}

	.tick-mark {
		border-left: 1px solid #aaa;
	}
	.baseline {
		border-top: 1px solid #aaa;
	}

	.tick .text {
		color: #666;
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
	}
	/* Snapped end labels sit 40% inside their edge instead of centered on it */
	.axis.snapLabels .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapLabels .tick.tick-0 {
		transform: translateX(40%);
	}
</style>
