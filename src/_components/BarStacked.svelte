<!--
	@component
	Generates an SVG stacked bar chart. Each series takes its color from the `c` scale. The data must be in [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/** @param {any} d */
	function barWidth(d) {
		const xVals = k.xGet(d);
		return xVals[1] - xVals[0];
	}
</script>

<g class="bar-group">
	{#each k.data as series}
		{#each series as d, i}
			<rect
				class="group-rect"
				data-id={i}
				x={k.xGet(d)[0]}
				y={k.yGet(d)}
				height={k.yScale.bandwidth()}
				width={barWidth(d)}
				fill={k.cGet?.(series) ?? '#ccc'}
			></rect>
		{/each}
	{/each}
</g>
