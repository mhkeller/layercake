<!--
	@component
	Generates an SVG x-axis along the top of the chart. If the x scale is a band scale, each tick sits in the middle of its band.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks=false] - Show a vertical mark at each tick.
	 * @property {boolean} [gridlines=true] - Show gridlines extending into the chart area.
	 * @property {number} [tickMarkLength=6] - The length of the tick mark.
	 * @property {boolean} [showBaseline=false] - Show a solid line along the top of the chart.
	 * @property {boolean} [snapLabels=false] - Instead of centering the text labels on the first and the last items, align them to the edges of the chart.
	 * @property {(d: any) => string} [format=d => d] - Formats a tick value for display.
	 * @property {number|Array<any>|((ticks: Array<any>) => Array<any>)} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function.
	 * @property {number} [tickGutter=0] - The gap in pixels between the top of the chart area and the start of the tick.
	 * @property {number} [dx=0] - Horizontal offset of the label in pixels.
	 * @property {number} [dy=-4] - Vertical offset of the label in pixels.
	 */

	/** @type {Props} */
	let {
		tickMarks = false,
		gridlines = true,
		tickMarkLength = 6,
		showBaseline = false,
		snapLabels = false,
		format = d => d,
		ticks = undefined,
		tickGutter = 0,
		dx = 0,
		dy = -4
	} = $props();

	// Snapped labels anchor the first tick to the left edge and the last to the right
	/** @param {number} i */
	function textAnchor(i) {
		if (snapLabels === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	}

	let tickLen = $derived(tickMarks === true ? (tickMarkLength ?? 6) : 0);

	let isBandwidth = $derived(typeof k.xScale.bandwidth === 'function');

	/** @type {Array<any>} */
	let tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? k.xScale.domain()
				: typeof ticks === 'function'
					? ticks(k.xScale.ticks())
					: k.xScale.ticks(ticks)
	);

	let halfBand = $derived(isBandwidth ? k.xScale.bandwidth() / 2 : 0);
</script>

<g class="axis x-axis" class:snapLabels>
	{#if showBaseline === true}
		<line class="baseline" y1="0" y2="0" x1="0" x2={k.width} />
	{/if}

	{#each tickVals as tick, i (tick)}
		<!-- Fall back to the top of the chart if the chart has no y dimension -->
		<g
			class="tick tick-{i}"
			transform="translate({k.xScale(tick)},{k.yRange ? Math.min(...k.yRange) : 0})"
		>
			{#if gridlines === true}
				<line class="gridline" x1={halfBand} x2={halfBand} y1={k.height} y2="0" />
			{/if}
			{#if tickMarks === true}
				<line
					class="tick-mark"
					x1={halfBand}
					x2={halfBand}
					y1={-tickGutter}
					y2={-tickLen - tickGutter}
				/>
			{/if}
			<text x={halfBand} y={-tickGutter - tickLen} {dx} {dy} text-anchor={textAnchor(i)}
				>{format(tick)}</text
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
	/* Push the snapped end labels 3px outward so they clear the chart edge */
	.axis.snapLabels .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapLabels .tick.tick-0 text {
		transform: translateX(-3px);
	}
</style>
