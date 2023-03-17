<script>
	import { LayerCake, Svg, bin, takeEvery } from 'layercake';

  import { extent } from 'd3-array';
	import { scaleBand } from 'd3-scale';
	import { format } from 'd3-format';

	import Column from '../../_components/Column.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';

	import calcThresholds from '../../_modules/calcThresholds.js';

	import data from '../../_data/unemployment.js';

	const f = format('.2f');

	const xKey = ['x0', 'x1'];
	const yKey = 'length';

	let binCount = 40;

	const domain = extent(data);

	$: thresholds = calcThresholds(domain, binCount);
	$: slimThresholds = takeEvery(thresholds, 5);

	$: binnedData = bin(data, d => d, {
		domain,
		thresholds
	})
</script>

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

<div class="input-container" style="position: absolute;right:10px;z-index: 9;">
	<input
		style="margin:0;"
		type="range"
		min="4"
		max="100"
		step="4"
		bind:value={binCount}
	/> <span class="counter-container" style="display:inline-block;vertical-align:top;width: 70px;text-align:right;">{binCount} bins</span>
</div>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20, right: 5, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		xDomain={thresholds}
		xScale={scaleBand().paddingInner([0])}
		yDomain={[0, null]}
		data={binnedData}
	>
		<Svg>
			<AxisX
				gridlines={false}
				baseline={true}
				ticks={slimThresholds}
				formatTick={d => +f(d)}
			/>
			<AxisY
				gridlines={false}
				ticks={3}
			/>
			<Column
				fill={'#fff'}
				stroke={'#000'}
				strokeWidth={1}
			/>
		</Svg>
	</LayerCake>
</div>
