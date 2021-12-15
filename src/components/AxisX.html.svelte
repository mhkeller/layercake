<script>
	/**
		Generates an HTML x-axis, useful for server-side rendered charts.  This component is also configured to detect if your x-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
		@type {Boolean} [gridlines=true] – Extend lines from the ticks into the chart space.
		@type {Boolean} [tickMarks=false] – Show a vertical mark for each tick.
		@type {Boolean} [baseline=false] – Show a solid line at the bottom.
		@type {Boolean} [snapTicks=false] – Instead of centering the text on the first and the last items, align them to the edges of the chart.
		@type {Function} [formatTick=d => d] – A function that passes the current tick value and expects a nicely formatted value in return.
		@type {Number|Array|Function} [ticks] – If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function.
		@type {Number} [yTick=7] – The distance from the baseline to place each tick value, in pixels.
	*/
	import { getContext } from 'svelte';

	const { xScale } = getContext('LayerCake');

	export let gridlines = true;
	export let tickMarks = false;
	export let baseline = false;
	export let snapTicks = false;
	export let formatTick = d => d;
	export let ticks = undefined;
	export let yTick = 7;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$xScale.domain() :
			typeof ticks === 'function' ?
				ticks($xScale.ticks()) :
					$xScale.ticks(ticks);
</script>

<div class='axis x-axis' class:snapTicks>
	{#each tickVals as tick, i}
		{#if gridlines !== false}
			<div class="gridline" style='left:{$xScale(tick)}%;top: 0px;bottom: 0;'></div>
		{/if}
		{#if tickMarks === true}
			<div class="tick-mark" style='left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;height:6px;bottom: -6px;'></div>
		{/if}
		<div
			class='tick tick-{ i }'
			style='left:{$xScale(tick) + (isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;'>
			<div
				class="text"
				style='top:{(yTick)}px;'>{formatTick(tick)}</div>
		</div>
	{/each}
	{#if baseline === true}
		<div class="baseline" style='top: 100%;width: 100%;'></div>
	{/if}
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
		font-size: .725em;
		font-weight: 200;
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
	.axis.snapTicks .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapTicks .tick.tick-0 {
		transform: translateX(40%);
	}
</style>
