<script>
	import { LayerCake, Html } from 'layercake';

	import ScatterHtml from '../../components/Scatter.html.svelte';
	import QuadTreePercentRange from '../../components/QuadTree.percent-range.html.svelte';

	// This example loads csv data as json using @rollup/plugin-dsv
	import data from '../../data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	const r = 3;
	const padding = 6;

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		background-color: rgba(171,0, 214);
		transform: translate(-50%, -50%);
		pointer-events: none;
		width: 10px;
		height: 10px;
	}
</style>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 20 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		data={data}
	>
		<Html>
			<ScatterHtml
				{r}
			/>
			<QuadTreePercentRange
				let:x
				let:y
				let:visible
			>
				<div
					class="circle"
					style="top:{y}%;left:{x}%;display: { visible ? 'block' : 'none' };"
				></div>
			</QuadTreePercentRange>
		</Html>
	</LayerCake>


</div>
