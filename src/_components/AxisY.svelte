<!--
	@component
	Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
 -->
<script>
	import { getContext } from 'svelte';

	const { padding, xRange, yScale, width } = getContext('LayerCake');

	/** @type {Boolean} [tickMarks=true] - Show marks next to the tick label. */
	export let tickMarks = true;

	/** @type {String} [labelPosition='above'] - Whether the label sits even with its value ('even') or sits on top ('above') the label. Default is 'above'. */
	export let labelPosition = 'above';

	/** @type {String|Number} [tickMarkLength='long'] - Tick mark style. Options: 'long', 'short' or a number in pixels. If 'long', the line extends the full width. If 'short', it will generally be the length of the longest tick label. */
	export let tickMarkLength = 'long';

	/** @type {Function} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d ;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [tickGutter=0] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min). */
	export let tickGutter = 0;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = 0;

	/** @type {Number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value). */
	export let charPixelWidth = 7.25;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$yScale.domain() :
			typeof ticks === 'function' ?
				ticks($yScale.ticks()) :
					$yScale.ticks(ticks);

	function calcStringLength(sum, val) {
		if (val === ',') return sum + charPixelWidth * 0.75;
		return sum + charPixelWidth;
	}

	$: tickLen = typeof tickMarkLength === 'number'
		? tickMarkLength
		: tickMarkLength === 'short'
			? labelPosition === 'above' ? widestTickLen : 5
			: 0;

	$: widestTickLen = Math.max(10, Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0))));

	$: x1 = -tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen);
	$: y = isBandwidth ? $yScale.bandwidth() / 2 : 0;
</script>

<g class='axis y-axis'>
	{#each tickVals as tick (tick)}
		<g class='tick tick-{tick}' transform='translate({$xRange[0]}, {$yScale(tick)})'>
			{#if tickMarks === true && tickMarkLength === 'long'}
				<line
					class="gridline"
					{x1}
					x2='{$width}'
					y1={y}
					y2={y}
				></line>
			{:else if tickMarks === true && (tickMarkLength === 'short' || typeof tickMarkLength === 'number')}
				<line
					class='tick-mark'
					{x1}
					x2={x1 + tickLen}
					y1={y}
					y2={y}
				></line>
			{/if}
			<text
				x='{-widestTickLen - tickGutter - (labelPosition === 'even' ? tickLen : 0)}'
				{y}
				{dx}
				dy='{dy + (labelPosition === 'even' ? 4 : -3)}'
			>{format(tick)}</text>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 11px;
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
