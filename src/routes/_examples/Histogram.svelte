<script>
	import { LayerCake, Svg } from 'layercake';
	import { histogram, extent } from 'd3-array';

	import Column from '../../components/Column.svelte';
	import AxisX from '../../components/AxisX.svelte';
	import AxisY from '../../components/AxisY.svelte';
	import thresholds from '../../modules/thresholds.js';

	import data from '../../data/unemployment.js';

	const xKey = ['x0', 'x1'];
	const yKey = 'length';
	let binCount = 40;

	const domain = extent(data);

	$: hist = histogram()
		.domain(domain)
		.thresholds(thresholds(domain, binCount));

	$: bins = hist(data);
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
		height: 100%;
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
		yDomain={[0, null]}
		data={bins}
	>
		<Svg>
			<AxisX
				gridlines={false}
				baseline={true}
				snapTicks={true}
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
