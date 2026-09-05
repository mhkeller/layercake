<!--
	@component
	Generates an SVG stacked column chart. Each series takes its color from the `c` scale and the x scale must be a band scale. The data must be in [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();
</script>

<g class="column-group">
	{#each k.data as series}
		{#each series as d, i}
			{@const yVals = k.yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}
			<rect
				class="group-rect"
				data-id={i}
				x={k.xGet(d)}
				y={yVals[1]}
				width={k.xScale.bandwidth()}
				height={columnHeight}
				fill={k.cGet?.(series) ?? '#ccc'}
			></rect>
		{/each}
	{/each}
</g>
