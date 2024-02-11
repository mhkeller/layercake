<!--
	@component
	Generates an SVG top x-axis. This component is also configured to detect if your x-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
 -->
 <script>
	import { getContext } from 'svelte';

	const { width, height, xScale, yRange } = getContext('LayerCake');

	/** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
	export let tickMarks = false;

	/** @type {String|Number} [tickMarkLength='long'] - Tick mark style. Options: 'long', 'short' or a number in pixels. If 'long', the line extends the full width. If 'short', it will generally be the length of the longest tick label. */
	export let tickMarkLength = 'long';

	/** @type {Boolean} [baseline=false] – Show a solid line at the bottom. */
	export let baseline = false;

	/** @type {Boolean} [snapLabels=false] - Instead of centering the text labels on the first and the last items, align them to the edges of the chart. */
	export let snapLabels = false;

	/** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d;

	/** @type {Number|Array|Function} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks = undefined;

	/** @type {Number} [tickGutter=0] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min). */
	export let tickGutter = 0;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=-4] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = -4;

	function textAnchor(i, sl) {
		if (sl === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	}

	$: tickLen = typeof tickMarkLength === 'number'
		? tickMarkLength
		: tickMarkLength === 'short'
			? 6
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

<g class="axis x-axis" class:snapLabels>
	{#each tickVals as tick, i (tick)}
		{#if baseline === true}
			<line class="baseline" y1='0' y2='0' x1="0" x2={$width} />
		{/if}

		<g class="tick tick-{i}" transform="translate({$xScale(tick)},{Math.min(...$yRange)})">
			{#if tickMarks === true && tickMarkLength === 'long'}
				<line
					class="gridline"
					x1="0"
					x2="0"
					y1={$height}
					y2="0"
				/>
			{:else if tickMarks === true && (tickMarkLength === 'short' || typeof tickMarkLength === 'number')}
				<line
					class="tick-mark"
					x1={halfBand}
					x2={halfBand}
					y1={tickGutter}
					y2={tickGutter - tickLen}
				/>
			{/if}
			<text
				x={halfBand}
				y={tickGutter - tickLen}
				{dx}
				{dy}
				text-anchor={textAnchor(i, snapLabels)}>{format(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 11px;
	}

	line,
	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
	}

	.tick .tick-mark,
	.baseline {
		stroke-dasharray: 0;
	}
	/* This looks slightly better */
	.axis.snapLabels .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapLabels .tick.tick-0 text {
		transform: translateX(-3px);
	}
</style>
