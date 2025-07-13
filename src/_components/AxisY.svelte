<!--
	@component
	Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the tickMarks in the middle of the bandwidth.
 -->
<script>
	import { getContext } from 'svelte';

	const { xRange, yScale, width } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks=false] - Show marks next to the tick label.
	 * @property {String} [labelPosition='even'] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark. Default is 'even'.
	 * @property {boolean} [snapBaselineLabel=false] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark.
	 * @property {boolean} [gridlines=true] - Show gridlines extending into the chart area.
	 * @property {Number} [tickMarkLength] - The length of the tick mark. If not set, becomes the length of the widest tick.
	 * @property {(d: any) => string} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return.
	 * @property {Number|Array<any>|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return.
	 * @property {Number} [tickGutter=0] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min).
	 * @property {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label.
	 * @property {Number} [dy=0] - Any optional value passed to the `dy` attribute on the text label.
	 * @property {Number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value).
	 */

	/** @type {Props} */
	let {
		tickMarks = false,
		labelPosition = 'even',
		snapBaselineLabel = false,
		gridlines = true,
		tickMarkLength = undefined,
		format = d => d,
		ticks = 4,
		tickGutter = 0,
		dx = 0,
		dy = 0,
		charPixelWidth = 7.25
	} = $props();

	/** @param {number} sum
	 *  @param {String} val */
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	let isBandwidth = $derived(typeof $yScale.bandwidth === 'function');
	/** @type {Array<any>} */
	let tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? $yScale.domain()
				: typeof ticks === 'function'
					? ticks($yScale.ticks())
					: $yScale.ticks(ticks)
	);
	let widestTickLen = $derived(
		Math.max(
			10,
			Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
		)
	);
	let tickLen = $derived(
		tickMarks === true
			? labelPosition === 'above'
				? (tickMarkLength ?? widestTickLen)
				: (tickMarkLength ?? 6)
			: 0
	);
	let x1 = $derived(-tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen));
	let y = $derived(isBandwidth ? $yScale.bandwidth() / 2 : 0);
	let maxTickValPx = $derived(Math.max(...tickVals.map($yScale)));
</script>

<g class="axis y-axis">
	{#each tickVals as tick (tick)}
		{@const tickValPx = $yScale(tick)}
		<g class="tick tick-{tick}" transform="translate({$xRange[0]}, {tickValPx})">
			{#if gridlines === true}
				<line class="gridline" {x1} x2={$width} y1={y} y2={y}></line>
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" {x1} x2={x1 + tickLen} y1={y} y2={y}></line>
			{/if}
			<text
				x={x1}
				{y}
				dx={dx + (labelPosition === 'even' ? -3 : 0)}
				text-anchor={labelPosition === 'above' ? 'start' : 'end'}
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
