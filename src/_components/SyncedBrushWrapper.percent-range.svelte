<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';

	import Line from './Line.svelte';
	import Area from './Area.svelte';
	import AxisX from './AxisX.percent-range.html.svelte';
	import AxisY from './AxisY.percent-range.html.svelte';
	import Brush from './Brush.html.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {any} [min]
	 * @property {any} [max]
	 * @property {string} [xKey]
	 * @property {string} [yKey]
	 * @property {any} [data]
	 * @property {string} [stroke]
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

	let brushedData = $state();
	$effect(() => {
		brushedData = data.slice((min || 0) * data.length, (max || 1) * data.length);
		if (brushedData.length < 2) {
			brushedData = data.slice(min * data.length, min * data.length + 2);
		}
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
	.chart-wrapper {
		width: 48%;
		height: 40%;
	}
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>
