<script>
	import { LayerCake, ScaledSvg, Html, takeEvery } from 'layercake';
	import { extent, bin } from 'd3-array';
	import { scaleBand } from 'd3-scale';
	import { format } from 'd3-format';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';

	import calcThresholds from '../../_modules/calcThresholds.js';

	import data from '../../_data/unemployment.js';

	const f = format('.2f');

	let binCount = $state(40);

	const xKey = ['x0', 'x1'];
	const yKey = 'length';

	const domain = extent(data);

	let steps = $derived(calcThresholds(domain, binCount));
	let hist = $derived(bin().domain(domain).thresholds(steps));

	let slimSteps = $derived(takeEvery(steps, 7));
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
		padding={{ top: 20, right: 5, bottom: 20, left: 31 }}
		x={xKey}
		y={yKey}
		xDomain={steps}
		xScale={scaleBand().paddingInner(0)}
		yDomain={[0, null]}
		data={hist(data)}
	>
		<Html>
			<AxisX gridlines={false} baseline ticks={slimSteps} format={d => +f(d)} />
			<AxisY gridlines={false} ticks={3} />
		</Html>
		<ScaledSvg>
			<Column fill="#fff" stroke="#000" strokeWidth={1} />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 250px;
	}

	input {
		height: auto;
	}
</style>
