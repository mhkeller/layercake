<!--
	@component
	Generates an SVG stacked column chart. It uses the c-scale for color assignments and assumes both `xScale` and `cScale` are ordinal scales. It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();
</script>

<g class="column-group">
	{#each cake.data as series, i}
		{#each series as d}
			{@const yVals = cake.yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}
			<rect
				class="group-rect"
				data-id={i}
				x={cake.xGet(d)}
				y={yVals[1]}
				width={cake.xScale.bandwidth()}
				height={columnHeight}
				fill={cake.cGet(series)}
			></rect>
		{/each}
	{/each}
</g>
