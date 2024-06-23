<!--
	@component
	Generates an HTML x-axis, useful for server-side rendered charts. This component is also configured to detect if your x-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.

	Although this is marked as a percent-range component, you can also use it with a normal scale with no cofiguration needed. By default, if you have `percentRange={true}` it will use percentages, otherwise it will use pixels. This makes this component compatible with server-side and client-side rendered charts.
 -->
<script>
	import { getContext } from 'svelte';

	const { xScale, percentRange } = getContext('LayerCake');

	/** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
	export let tickMarks = false;

	/** @type {Boolean} [gridlines=true] - Show gridlines extending into the chart area. */
	export let gridlines = true;

	/** @type {Number} [tickMarkLength=6] - The length of the tick mark. */
	export let tickMarkLength = 6;

	/** @type {Boolean} [baseline=false] – Show a solid line at the bottom. */
	export let baseline = false;

	/** @type {Boolean} [snapLabels=false] - Instead of centering the text labels on the first and the last items, align them to the edges of the chart. */
	export let snapLabels = false;

	/** @type {Function} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d;

	/** @type {Number|Array|Function} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks = undefined;

	/** @type {Number} [tickGutter=0] - The amount of whitespace between the start of the tick and the chart drawing area (the yRange min). */
	export let tickGutter = 0;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = 0;

	/** @type {String} units - Whether this component should use percentage or pixel values. If `percentRange={true}` it defaults to `'%'`. Options: `'%'` or `'px'`. */
	export let units = $percentRange === true ? '%' : 'px';

	$: tickLen = tickMarks === true
		? tickMarkLength ?? 6
		: 0;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$xScale.domain() :
			typeof ticks === 'function' ?
				ticks($xScale.ticks()) :
					$xScale.ticks(ticks);

	$: halfBand = isBandwidth ? $xScale.bandwidth() / 2 : 0
</script>

<div class='axis x-axis' class:snapLabels>
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = $xScale(tick)}

		{#if baseline === true}
			<div class="baseline" style='top:100%; width:100%;'></div>
		{/if}

		{#if gridlines === true}
			<div
				class="gridline"
				style:left='{tickValUnits}{units}'
				style='top:0; bottom:0;'></div>
		{/if}
		{#if tickMarks === true}
			<div
				class="tick-mark"
				style:left='{tickValUnits + halfBand}{units}'
				style:height='{tickLen}px'
				style:bottom='{-tickLen - tickGutter}px'
			></div>
		{/if}
		<div
			class='tick tick-{i}'
			style:left='{tickValUnits + halfBand}{units}'
			style='top:calc(100% + {tickGutter}px);'>
			<div
				class="text"
				style:top='{tickLen}px'
				style:transform='translate(calc(-50% + {dx}px), {dy}px)'
			>{format(tick)}</div>
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
