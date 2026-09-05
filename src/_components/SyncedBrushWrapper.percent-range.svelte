<!--
	@component
	Draws a server-side rendered line chart with a brush under it. Drag on the brush to zoom the chart above to that slice of the rows. Bind `min` and `max` to keep several of these in step, as the [SSR synced brush example](https://layercake.graphics/example-ssr/SyncedBrush) does.
 -->
<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';

	import Line from './Line.svelte';
	import Area from './Area.svelte';
	import AxisX from './AxisX.percent-range.html.svelte';
	import AxisY from './AxisY.percent-range.html.svelte';
	import Brush from './Brush.html.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {number|null} [min=null] - Where the brush starts, as a share of the rows from 0 to 1. Bind to it to sync charts.
	 * @property {number|null} [max=null] - Where the brush ends, as a share of the rows from 0 to 1. Bind to it to sync charts.
	 * @property {string} [xKey='x'] - The field holding each row's x value.
	 * @property {string} [yKey='y'] - The field holding each row's y value.
	 * @property {Array<Object>} [data=[]] - The rows to draw.
	 * @property {string} [stroke='#00e047'] - The line's stroke color. The area under it is the same color at low opacity.
	 */

	/** @type {Props} */
	let {
		min = $bindable(null),
		max = $bindable(null),
		xKey = 'x',
		yKey = 'y',
		data = [],
		stroke = '#00e047'
	} = $props();

	// The slice of rows inside the brush, with at least two so the line still draws when the brush is very narrow
	let brushedData = $derived.by(() => {
		const start = Math.max(0, Math.floor((min ?? 0) * data.length));
		const end = Math.min(data.length, Math.ceil((max ?? 1) * data.length));
		const brushed = data.slice(start, end);
		if (brushed.length < 2 && data.length >= 2) {
			return data.slice(start, start + 2);
		}
		return brushed;
	});
</script>

<div class="chart-wrapper">
	<div class="chart-container">
		<LayerCake
			ssr
			percentRange
			padding={{ bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			yDomain={[0, null]}
			data={brushedData}
		>
			<Html>
				<!-- Whole-number ticks only, and every other one when there are too many -->
				<AxisX
					ticks={ticks => {
						const filtered = ticks.filter(t => t % 1 === 0);
						if (filtered.length > 7) {
							return filtered.filter((t, i) => i % 2 === 0);
						}
						return filtered;
					}}
				/>
				<AxisY ticks={2} />
			</Html>
			<ScaledSvg>
				<Line {stroke} />
				<Area fill={`${stroke}10`} />
			</ScaledSvg>
		</LayerCake>
	</div>

	<div class="brush-container">
		<LayerCake ssr percentRange padding={{ top: 5 }} x={xKey} y={yKey} yDomain={[0, null]} {data}>
			<ScaledSvg>
				<Line {stroke} />
				<Area fill={`${stroke}10`} />
			</ScaledSvg>
			<Html>
				<Brush bind:min bind:max />
			</Html>
		</LayerCake>
	</div>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-wrapper {
		width: 48%;
		height: 40%;
	}
	.chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>
