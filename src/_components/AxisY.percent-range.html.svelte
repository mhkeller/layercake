<!--
	@component
	Generates an HTML y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the tickMarks in the middle of the bandwidth.

	Although this is marked as a percent-range component, you can also use it with a normal scale with no configuration needed. By default, if you have `percentRange={true}` it will use percentages, otherwise it will use pixels. This makes this component compatible with server-side and client-side rendered charts. Set the `units` prop to either `'%'` or `'px'` to override the default behavior.
 -->
<script>
	import { getContext } from 'svelte';

	const { xRange, yScale, percentRange } = getContext('LayerCake');

	

	

	

	

	

	

	

	

	

	

	

	
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks] - Show marks next to the tick label.
	 * @property {String} [labelPosition] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark. Default is 'even'.
	 * @property {boolean} [snapBaselineLabel] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark.
	 * @property {boolean} [gridlines] - Show gridlines extending into the chart area.
	 * @property {Number|undefined} [tickMarkLength] - The length of the tick mark. If not set, becomes the length of the widest tick.
	 * @property {(d: any) => string} [format] - A function that passes the current tick value and expects a nicely formatted value in return.
	 * @property {Number|Array<any>|Function} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return.
	 * @property {Number} [tickGutter] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min).
	 * @property {Number} [dx] - Any optional value passed to the `dx` attribute on the text label.
	 * @property {Number} [dy] - Any optional value passed to the `dy` attribute on the text label.
	 * @property {Number} [charPixelWidth] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value).
	 * @property {String} units - Whether this component should use percentage or pixel values. If `percentRange={true} [units] - Whether this component should use percentage or pixel values. If `percentRange={true}` it defaults to `'%'`. Options: `'%'` or `'px'`.
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
		dy = -3,
		charPixelWidth = 7.25,
		units = $percentRange === true ? '%' : 'px'
	} = $props();



	/** @param {Number} sum
	 *  @param {String} val */
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}




	let isBandwidth = $derived(typeof $yScale.bandwidth === 'function');
	/** @type {Array<any>} */
	let tickVals = $derived(Array.isArray(ticks)
		? ticks
		: isBandwidth
			? $yScale.domain()
			: typeof ticks === 'function'
				? ticks($yScale.ticks())
				: $yScale.ticks(ticks));
	let widestTickLen = $derived(Math.max(
		10,
		Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
	));
	let tickLen =
		$derived(tickMarks === true
			? labelPosition === 'above'
				? (tickMarkLength ?? widestTickLen)
				: (tickMarkLength ?? 6)
			: 0);
	let x1 = $derived(-tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen));
	let halfBand = $derived(isBandwidth ? $yScale.bandwidth() / 2 : 0);
	let maxTickValUnits = $derived(Math.max(...tickVals.map($yScale)));
</script>

<div class="axis y-axis">
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = $yScale(tick)}

		<div
			class="tick tick-{i}"
			style="left:{$xRange[0]}{units};top:{tickValUnits + halfBand}{units};"
		>
			{#if gridlines === true}
				<div class="gridline" style="top:0;" style:left="{x1}px" style:right="0px"></div>
			{/if}
			{#if tickMarks === true}
				<div class="tick-mark" style:top="0" style:left="{x1}px" style:width="{tickLen}px"></div>
			{/if}
			<div
				class="text"
				style:top="0"
				style:text-align={labelPosition === 'even' ? 'right' : 'left'}
				style:width="{widestTickLen}px"
				style:left="{-widestTickLen - tickGutter - (labelPosition === 'even' ? tickLen : 0)}px"
				style:transform="translate({dx + (labelPosition === 'even' ? -3 : 0)}px, calc(-50% + {dy +
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
	.baseline,
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

	.baseline.gridline {
		border-top-style: solid;
	}

	.tick .text {
		color: #666;
	}
</style>
