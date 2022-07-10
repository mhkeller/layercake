<!--
	@component
	Generates an HTML y-axis.
 -->
<script>
	import { getContext } from 'svelte';

	const { padding, xRange, yScale } = getContext('LayerCake');

	/** @type {Boolean} [gridlines=true] - Extend lines from the ticks into the chart space */
	export let gridlines = true;

	/** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
	export let tickMarks = false;

	/** @type {Boolean} [baseline=false] – Show a solid line at the bottom. */
	export let baseline = false;

	/** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick = d => d;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [xTick=-4] - How far over to position the text marker. */
	export let xTick = -4;

	/** @type {Number} [yTick=-1] - How far up and down to position the text marker. */
	export let yTick = -1;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$yScale.domain() :
			typeof ticks === 'function' ?
				ticks($yScale.ticks()) :
					$yScale.ticks(ticks);
</script>

<div class='axis y-axis' style='transform:translate(-{$padding.left}px, 0)'>
	{#each tickVals as tick, i (tick)}
		<div class='tick tick-{i}' style='top:{$yScale(tick) + (isBandwidth ? $yScale.bandwidth () / 2 : 0)}%;left:{$xRange[0]}%;'>
			{#if gridlines !== false}
				<div class="gridline" style='top:0;left:{isBandwidth ? $padding.left : 0}px;right:-{$padding.left + $padding.right}px;'></div>
			{/if}
			{#if baseline !== false && i === 0}
				<div class="gridline baseline" style='top:0;left:{isBandwidth ? $padding.left : 0};right:-{$padding.left + $padding.right}px;'></div>
			{/if}
			{#if tickMarks === true}
				<div class="tick-mark" style='top:0;left:{isBandwidth ? $padding.left - 6 : 0}px;width:6px;'></div>
			{/if}
			<div
				class="text"
				style='
					top:{yTick}px;
					left:{isBandwidth ? ($padding.left + xTick - 4) : 0}px;
					transform: translate({isBandwidth ? '-100%' : 0}, {isBandwidth ? -50 - Math.floor($yScale.bandwidth() / -2) : '-100'}%);
				'
			>{formatTick(tick)}</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline,
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 12px;
		width: 100%;
		font-weight: 100;
	}

	.gridline {
		border-top: 1px dashed #aaa;
	}
	.tick-mark {
		border-top: 1px solid #aaa;
	}

	.baseline.gridline {
		border-top-style: solid;
	}

	.tick .text {
		color: #666;
	}
</style>
