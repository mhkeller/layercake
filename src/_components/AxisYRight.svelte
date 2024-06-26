<!--
	@component
	Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.
 -->
<script>
	import { getContext } from 'svelte';

	const { xRange, yScale, width } = getContext('LayerCake');

	/** @type {Boolean} [tickMarks=false] - Show marks next to the tick label. */
	export let tickMarks = false;

	/** @type {String} [labelPosition='above'] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark. */
	export let labelPosition = 'above';

	/** @type {Boolean} [snapBaselineLabel=false] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark. */
	export let snapBaselineLabel = false;

	/** @type {Boolean} [gridlines=true] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark. */
	export let gridlines = true;

	/** @type {Number|undefined} [tickMarkLength=undefined] - The length of the tick mark. If not set, becomes the length of the widest tick. */
	export let tickMarkLength = undefined;

	/** @type {(d: any) => string} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d;

	/** @type {Number|Array<Number>|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [tickGutter=5] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min). */
	export let tickGutter = 5;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = 0;

	/** @type {Number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value). */
	export let charPixelWidth = 7.25;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	/** @type {Array<Number>} */
	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
			? $yScale.domain()
			: typeof ticks === 'function'
				? ticks($yScale.ticks())
				: $yScale.ticks(ticks);

	/** @param {Number} sum
	 *  @param {String} val */
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	$: tickLen =
		tickMarks === true
			? labelPosition === 'above'
				? tickMarkLength ?? widestTickLen
				: tickMarkLength ?? 6
			: 0;

	$: widestTickLen = Math.max(
		10,
		Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
	);

	$: x2 = $width + tickGutter + (labelPosition === 'above' ? widestTickLen : tickLen);
	$: y = isBandwidth ? $yScale.bandwidth() / 2 : 0;

	$: maxTickValPx = Math.max(...tickVals.map($yScale));
</script>

<g class="axis y-axis">
	{#each tickVals as tick (tick)}
		{@const tickValPx = $yScale(tick)}
		<g class="tick tick-{tick}" transform="translate({$xRange[0]}, {tickValPx})">
			{#if gridlines === true}
				<line class="gridline" x1="0" {x2} y1={y} y2={y}></line>
			{/if}
			{#if tickMarks === true}
				<line
					class="tick-mark"
					x1={$width + tickGutter}
					x2={$width + tickGutter + tickLen}
					y1={y}
					y2={y}
				></line>
			{/if}

			<text
				x={$width + tickGutter + (labelPosition === 'even' ? tickLen : 0)}
				{y}
				dx={dx + (labelPosition === 'even' ? 3 : 0)}
				dy={dy +
					(labelPosition === 'above' || (snapBaselineLabel === true && tickValPx === maxTickValPx)
						? -3
						: 4)}>{format(tick)}</text
			>
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
