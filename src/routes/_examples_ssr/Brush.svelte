<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';

	import Line from '../../_components/Line.svelte';
	import Area from '../../_components/Area.svelte';
	import AxisX from '../../_components/AxisX.percent-range.html.svelte';
	import AxisY from '../../_components/AxisY.percent-range.html.svelte';
	import Brush from '../../_components/Brush.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../_data/points.csv';

	let brushExtents = $state([null, null]);

	const xKey = 'myX';
	const yKey = 'myY';

	let brushedData = $derived.by(() => {
		const slicedData = data.slice(
			(brushExtents[0] || 0) * data.length,
			(brushExtents[1] || 1) * data.length
		);
		if (slicedData.length < 2 && brushExtents[0] !== null) {
			return data.slice(brushExtents[0] * data.length, brushExtents[0] * data.length + 2);
		}
		return slicedData;
	});
</script>

<div class="brushed-chart-container">
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
			<AxisY ticks={4} />
		</Html>
		<ScaledSvg>
			<Line stroke="#00e047" />
			<Area fill="#00e04710" />
		</ScaledSvg>
	</LayerCake>
</div>

<div class="brush-container">
	<LayerCake ssr percentRange padding={{ top: 5 }} x={xKey} y={yKey} yDomain={[0, null]} {data}>
		<ScaledSvg>
			<Line stroke="#00e047" />
			<Area fill="#00e04710" />
		</ScaledSvg>
		<Html>
			<Brush bind:min={brushExtents[0]} bind:max={brushExtents[1]} />
		</Html>
	</LayerCake>
</div>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.brushed-chart-container {
		width: 100%;
		height: 80%;
	}
	.brush-container {
		width: 100%;
		height: 20%;
	}
</style>
