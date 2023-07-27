<!--
	@component
	Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
 -->
<script>
	import { getContext } from 'svelte';

	const { padding, xRange, yScale } = getContext('LayerCake');

	/** @type {Boolean} [gridlines=true] - Extend lines from the ticks into the chart space */
	export let gridlines = true;

	/** @type {Boolean} [labelPosition='above'] - Whether the label sits even with its value ('even') or sits on top ('above'). Default is 'above'. */
	export let labelPosition = 'above';

	/** @type {Boolean} [tickMarks=false] - Show a horiontal mark for each tick. */
	export let tickMarks = false;

	/** @type {Boolean} [tickMarks=undefined] - How many pixels wide should the tickMark be. By default, this is calculated dynamically and the tick mark extends from the end of the tickOffsetX to the tickGutter position. Set a value here to override that calculation. */
	export let tickMarkWidth = undefined;

	/** @type {Function} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [tickGutter=2] - The amount of whitespace between the min of the xRange and the start of the tick. */
	export let tickGutter = 2;

	/** @type {Number} [tickOffsetX=0] - How far over to position the tick mark and label. */
	export let tickOffsetX = 0

	/** @type {Number} [yOffset=0] - How far up and down to nudge the text label. */
	export let yOffset = 0;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = 0;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$yScale.domain() :
			typeof ticks === 'function' ?
				ticks($yScale.ticks()) :
					$yScale.ticks(ticks);

	const tickWidthEven = 3;
	const charPixelWidth = 7.25;
	$: tickOffsetXVal = tickOffsetX + Math.min(-10, -1 * Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0))));

	function calcStringLength(sum, val) {
		if (val === ',') return sum + charPixelWidth * 0.75;
		return sum + charPixelWidth;
	}
</script>

<g class='axis y-axis' transform='translate(0, 0)'>
	{#each tickVals as tick (tick)}
		<g class='tick tick-{tick}' transform='translate({$xRange[0]}, {$yScale(tick) - 1})'>
			{#if gridlines !== false}
				<line
					class="gridline"
					x1='{isBandwidth ? 0 : tickOffsetXVal - tickGutter}'
					x2='100%'
					y1={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
					y2={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
				></line>
			{/if}
			{#if tickMarks === true}
				<line
					class='tick-mark'
					x1='{(isBandwidth || labelPosition === 'even') ? 0 : tickOffsetXVal - tickGutter}'
					x2='{typeof tickMarkWidth === 'number' ? (tickOffsetXVal - tickGutter) + tickMarkWidth : (isBandwidth || labelPosition === 'even') ? -tickGutter - tickWidthEven : -tickGutter}'
					y1={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
					y2={(isBandwidth ? ($yScale.bandwidth() / 2) : 0)}
				></line>
			{/if}
			<text
				x='{labelPosition === 'even' ? tickOffsetXVal - tickGutter * 2 : tickOffsetXVal - tickGutter}'
				y='{(isBandwidth ? ($yScale.bandwidth() / 2) + yOffset : yOffset)}'
				dx='{isBandwidth && tickMarks ? -tickGutter : dx}'
				dy='{isBandwidth || labelPosition === 'even' ? dy + 3 : dy - 3}'
			>{format(tick)}</text>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #aaa;
	}
	.tick .gridline {
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}
</style>
