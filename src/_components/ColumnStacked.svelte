<!--
	@component
	Generates an SVG stacked column chart. It uses the z-scale for color assignments and assumes both `xScale` and `zScale` are ordinal scales. It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();
</script>

<g class="column-group">
	{#each c.data as series, i}
		{#each series as d}
			{@const yVals = c.yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}
			<rect
				class="group-rect"
				data-id={i}
				x={c.xGet(d)}
				y={yVals[1]}
				width={c.xScale.bandwidth()}
				height={columnHeight}
				fill={c.zGet(series)}
			></rect>
		{/each}
	{/each}
</g>
