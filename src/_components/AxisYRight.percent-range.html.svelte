<!--
	@component
	Generates an HTML y-axis on the right-hand side. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the markers in the middle of the bandwidth.

	If you have `percentRange={true}` it will use percentages, otherwise it will use pixels. This makes this component compatible with server-side and client-side rendered charts.
 -->
 <script>
	import { getContext } from 'svelte';

	const { xRange, yScale, width, percentRange } = getContext('LayerCake');

	/** @type {Boolean} [tickMarks=true] - Show marks next to the tick label. */
	export let tickMarks = true;

	/** @type {String} [labelPosition='even'] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark. Default is 'even'. */
	export let labelPosition = 'even';

	/** @type {Boolean} [snapBaselineLabel=false] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark. */
	export let snapBaselineLabel = false;

	/** @type {Boolean} [gridlines=true] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark. */
	export let gridlines = true;

	/** @type {Number} [tickMarkLength=undefined] - The length of the tick mark. If not set, becomes the length of the widest tick. */
	export let tickMarkLength = undefined;

	/** @type {Function} [format=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let format = d => d ;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [tickGutter=5] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min). */
	export let tickGutter = 5;

	/** @type {Number} [dx=0] - Any optional value passed to the `dx` attribute on the text label. */
	export let dx = 0;

	/** @type {Number} [dy=-3] - Any optional value passed to the `dy` attribute on the text label. */
	export let dy = -3;

	/** @type {Number} [charPixelWidth=7.25] - Used to calculate the widest label length to offset labels. Adjust if the automatic tick length doesn't look right because you have a bigger font (or just set `tickMarkLength` to a pixel value). */
	export let charPixelWidth = 7.25;

	/** @type {String} units - Whether this component should use percentage or pixel values. If `percentRange={true}` it defaults to `'%'`. Options: `'%'` or `'px'`. */
	export let units = $percentRange === true ? '%' : 'px';

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$:console.log({units})


	$: tickVals = Array.isArray(ticks) ? ticks :
		isBandwidth ?
			$yScale.domain() :
			typeof ticks === 'function' ?
				ticks($yScale.ticks()) :
					$yScale.ticks(ticks);

	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	$: tickLen = tickMarks === true
		? labelPosition === 'above'
			? tickMarkLength ?? widestTickLen
			: tickMarkLength ?? 6
		: 0;

	$: widestTickLen = Math.max(10, Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0))));

	$: halfBand = isBandwidth ? $yScale.bandwidth() / 2 : 0;

	$: maxTickValUnits = Math.max(...tickVals.map($yScale));
</script>

<div class='axis y-axis'>
	{#each tickVals as tick, i (tick)}
		{@const tickValUnits = $yScale(tick)}

		<div class='tick tick-{i}' style='left:{$xRange[0]}{units};top:{tickValUnits + halfBand}{units};'>
			{#if gridlines === true}
				<div
					class="gridline"
					style='0'
					style:left='0px'
					style:right='{(labelPosition === 'above' ? -widestTickLen : -tickLen) - tickGutter}px'
				></div>
			{/if}
			{#if tickMarks === true}
				<div
					class="tick-mark"
					style:top='0'
					style:left="{$width + tickGutter}px"
					style:width='{tickLen}px'
				></div>
			{/if}
			<div
				class="text"
				style:top='0'
				style:left='calc(100% + {tickGutter + (labelPosition === 'even' ? tickLen : 0)}px)'
				style:transform='translate({dx + (labelPosition === 'even' ? 3 : 0)}px, calc(-50% + {dy + (labelPosition === 'above' || (snapBaselineLabel === true && tickValUnits === maxTickValUnits) ? -3 : 4)}px))'
			>{format(tick)}</div>
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
