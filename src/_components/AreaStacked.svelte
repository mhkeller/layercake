<!--
	@component
	Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape) and sets the color via an ordinal scale in `zScale`. It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getLayerCakeContext } from 'layercake';
	import { area } from 'd3-shape';

	const c = getLayerCakeContext();

	let areaGen = $derived(
		area()
			.x(d => c.xGet(d))
			.y0(d => c.yScale(d[0]))
			.y1(d => c.yScale(d[1]))
	);
</script>

<g class="area-group">
	{#each c.data as d}
		<path class="path-area" d={areaGen(d)} fill={c.zGet(d)}></path>
	{/each}
</g>
