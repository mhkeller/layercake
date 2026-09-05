<!--
	@component
	Generates an SVG y-axis along the left edge of the chart. If the y scale is a band scale, each tick sits in the middle of its band.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks=false] - Show a horizontal mark at each tick.
	 * @property {'even'|'above'} [labelPosition='even'] - Whether the label sits level with its tick ('even') or above it ('above').
	 * @property {boolean} [snapBaselineLabel=false] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark.
	 * @property {boolean} [gridlines=true] - Show gridlines extending into the chart area.
	 * @property {number} [tickMarkLength] - Length of the tick mark in pixels. Defaults to the width of the widest label when `labelPosition` is 'above', otherwise 6.
	 * @property {(d: any) => string} [format=d => d] - Formats a tick value for display.
	 * @property {number|Array<any>|((ticks: Array<any>) => Array<any>)} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return.
	 * @property {number} [tickGutter=0] - The gap in pixels between the left edge of the chart area and the tick.
	 * @property {number} [dx=0] - Horizontal offset of the label in pixels.
	 * @property {number} [dy=0] - Vertical offset of the label in pixels.
	 * @property {number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value).
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
	 *  @param {string} val */
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	let isBandwidth = $derived(typeof k.yScale.bandwidth === 'function');
	/** @type {Array<any>} */
	let tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? k.yScale.domain()
				: typeof ticks === 'function'
					? ticks(k.yScale.ticks())
					: k.yScale.ticks(ticks)
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
	let halfBand = $derived(isBandwidth ? k.yScale.bandwidth() / 2 : 0);
	let maxTickValPx = $derived(Math.max(...tickVals.map(k.yScale)));
</script>

<g class="axis y-axis">
	{#each tickVals as tick (tick)}
		{@const tickValPx = k.yScale(tick)}
		<!-- Fall back to the left edge if the chart has no x dimension -->
		<g class="tick tick-{tick}" transform="translate({k.xRange ? k.xRange[0] : 0}, {tickValPx})">
			{#if gridlines === true}
				<line class="gridline" {x1} x2={k.width} y1={halfBand} y2={halfBand}></line>
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" {x1} x2={x1 + tickLen} y1={halfBand} y2={halfBand}></line>
			{/if}
			<text
				x={x1}
				y={halfBand}
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

	/* A solid line at the zero tick */
	.tick.tick-0 line {
		stroke-dasharray: 0;
	}
</style>
