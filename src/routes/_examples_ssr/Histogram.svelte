<script>
	import { LayerCake, ScaledSvg, Html, bin, takeEvery } from 'layercake';

	import { scaleBand } from 'd3-scale';
	import { format } from 'd3-format';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	import calcThresholds from '../../_modules/calcThresholds.js';

	import data from '../../_data/unemployment.js';

	const f = format('.2f');

	// Each bin has x0 and x1 edges, so the x accessor is both and each column spans them
	const xKey = ['x0', 'x1'];
	const yKey = 'length';

	let binCount = $state(40);

	/** @type {[number, number]} */
	const domain = [Math.min(...data), Math.max(...data)];

	let thresholds = $derived(calcThresholds(domain, binCount));
	let slimThresholds = $derived(takeEvery(thresholds, 5));

	let binnedData = $derived(
		bin(data, d => d, {
			domain,
			thresholds
		})
	);
</script>

<div class="input-container" style="position: absolute;right:10px;z-index: 9;">
	<input style="margin:0;" type="range" min="4" max="100" step="4" bind:value={binCount} />
	<span
		class="counter-container"
		style="display:inline-block;vertical-align:top;width: 70px;text-align:right;"
		>{binCount} bins</span
	>
</div>

<div class="chart-container">
	<LayerCake
		ssr
		percentRange
		padding={{ top: 20, right: 5, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		xDomain={thresholds}
		xScale={scaleBand().paddingInner(0)}
		yDomain={[0, null]}
		data={binnedData}
	>
		<Html>
			<AxisX gridlines={false} showBaseline ticks={slimThresholds} format={d => String(+f(d))} />
			<AxisY gridlines={false} ticks={3} />
		</Html>
		<ScaledSvg>
			<Column fill="#fff" stroke="#000" strokeWidth={1} />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
	input {
		height: auto;
	}
</style>
