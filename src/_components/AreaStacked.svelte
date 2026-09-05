<!--
	@component
	Generates an SVG stacked area chart using the `area` function from [d3-shape](https://github.com/d3/d3-shape). Each series takes its color from the `c` scale. The data must be in [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { area } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	let areaGen = $derived(
		area()
			.x(d => k.xGet(d))
			.y0(d => k.yScale(d[0]))
			.y1(d => k.yScale(d[1]))
	);
</script>

<g class="area-group">
	{#each k.data as d}
		<path class="path-area" d={areaGen(d)} fill={k.cGet?.(d) ?? '#ccc'}></path>
	{/each}
</g>
