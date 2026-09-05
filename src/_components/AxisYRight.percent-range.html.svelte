<!--
	@component
	Generates an HTML y-axis along the right edge of the chart, for server-side rendered charts. If the y scale is a band scale, each tick sits in the middle of its band.

	Positions are percentages when `percentRange={true}` and pixels otherwise, so this also works in a client-side chart with no setup. Set the `units` prop to `'%'` or `'px'` to override that.
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
	 * @property {number} [tickGutter=5] - The gap in pixels between the right edge of the chart area and the tick. Defaults to 5 so labels clear the edge.
	 * @property {number} [dx=0] - Horizontal offset of the label in pixels.
	 * @property {number} [dy=-3] - Vertical offset of the label in pixels.
	 * @property {number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value).
	 * @property {'px'|'%'} [units] - Position with pixels or percentages. Defaults to `'%'` when `percentRange={true}`, otherwise `'px'`.
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
		tickGutter = 5,
		dx = 0,
		dy = -3,
		charPixelWidth = 7.25,
		units = k.percentRange === true ? '%' : 'px'
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
	let halfBand = $derived(isBandwidth ? k.yScale.bandwidth() / 2 : 0);
	let maxTickValUnits = $derived(Math.max(...tickVals.map(k.yScale)));
</script>

<div class="axis y-axis">
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = k.yScale(tick)}

		<div
			class="tick tick-{i}"
			style="left:{k.xRange ? k.xRange[0] : 0}{units};top:{tickValUnits + halfBand}{units};"
		>
			{#if gridlines === true}
				<div
					class="gridline"
					style:top="0"
					style:left="0px"
					style:right="{(labelPosition === 'above' ? -widestTickLen : -tickLen) - tickGutter}px"
				></div>
			{/if}
			{#if tickMarks === true}
				<div
					class="tick-mark"
					style:top="0"
					style:left="{k.width + tickGutter}px"
					style:width="{tickLen}px"
				></div>
			{/if}
			<div
				class="text"
				style:top="0"
				style:left="calc(100% + {tickGutter + (labelPosition === 'even' ? tickLen : 0)}px)"
				style:transform="translate({dx + (labelPosition === 'even' ? 3 : 0)}px, calc(-50% + {dy +
					(labelPosition === 'above' ||
					(snapBaselineLabel === true && tickValUnits === maxTickValUnits)
						? -3
						: 4)}px))"
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
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 11px;
		width: 100%;
	}

	.gridline {
		border-top: 1px dashed #aaa;
	}
	.tick-mark {
		border-top: 1px solid #aaa;
	}

	.tick .text {
		color: #666;
	}
</style>
