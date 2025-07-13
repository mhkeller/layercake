<!--
	@component
	Generates an HTML top x-axis, useful for server-side rendered charts.  This component is also configured to detect if your x-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.

	Although this is marked as a percent-range component, you can also use it with a normal scale with no configuration needed. By default, if you have `percentRange={true}` it will use percentages, otherwise it will use pixels. This makes this component compatible with server-side and client-side rendered charts. Set the `units` prop to either `'%'` or `'px'` to override the default behavior.
 -->
<script>
	import { getContext } from 'svelte';

	const { xScale, percentRange } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks=false] - Show a vertical mark for each tick.
	 * @property {boolean} [gridlines=true] - Show gridlines extending into the chart area.
	 * @property {Number} [tickMarkLength=6] - The length of the tick mark.
	 * @property {boolean} [baseline=false] - Show a solid line at the bottom.
	 * @property {boolean} [snapLabels=false] - Instead of centering the text labels on the first and the last items, align them to the edges of the chart.
	 * @property {(d: any) => string} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return.
	 * @property {Number|Array<any>|Function} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function.
	 * @property {Number} [tickGutter=0] - The amount of whitespace between the start of the tick and the chart drawing area (the yRange min).
	 * @property {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label.
	 * @property {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label.
	 * @property {'px'|'%'} units - Whether this component should use percentage or pixel values. If `percentRange={true}` it defaults to `'%'`. Options: `'%'` or `'px'`.
	 */

	/** @type {Props} */
	let {
		tickMarks = false,
		gridlines = true,
		tickMarkLength = 6,
		baseline = false,
		snapLabels = false,
		format = d => d,
		ticks = undefined,
		tickGutter = 0,
		dx = 0,
		dy = 0,
		units = $percentRange === true ? '%' : 'px'
	} = $props();

	let tickLen = $derived(tickMarks === true ? (tickMarkLength ?? 6) : 0);

	let isBandwidth = $derived(typeof $xScale.bandwidth === 'function');

	/** @type {Array<any>} */
	let tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? $xScale.domain()
				: typeof ticks === 'function'
					? ticks($xScale.ticks())
					: $xScale.ticks(ticks)
	);

	let halfBand = $derived(isBandwidth ? $xScale.bandwidth() / 2 : 0);
</script>

<div class="axis x-axis" class:snapLabels>
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = $xScale(tick)}

		{#if baseline === true}
			<div class="baseline" style="top:0; width:100%;"></div>
		{/if}

		{#if gridlines === true}
			<div class="gridline" style:left="{tickValUnits}{units}" style="top:0; bottom:0;"></div>
		{/if}
		{#if tickMarks === true}
			<div
				class="tick-mark"
				style:left="{tickValUnits + halfBand}{units}"
				style:height="{tickLen}px"
				style:top="{-tickLen - tickGutter}px"
			></div>
		{/if}
		<div
			class="tick tick-{i}"
			style:left="{tickValUnits + halfBand}{units}"
			style="top:{-tickGutter}px;"
		>
			<div
				class="text"
				style:top={-tickLen + 2 + 'px'}
				style:transform={`translate(calc(-50% + ${dx}px), calc(-100% + ${dy}px))`}
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
	/* This looks a little better at 40 percent than 50 */
	.axis.snapLabels .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapLabels .tick.tick-0 {
		transform: translateX(40%);
	}
</style>
