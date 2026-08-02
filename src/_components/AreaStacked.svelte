<!--
	@component
	Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape) and sets the color via an ordinal scale in `cScale`. It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { area } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	let areaGen = $derived(
		area()
			.x(d => cake.xGet(d))
			.y0(d => cake.yScale(d[0]))
			.y1(d => cake.yScale(d[1]))
	);
</script>

<g class="area-group">
	{#each cake.data as d}
		<path class="path-area" d={areaGen(d)} fill={cake.cGet(d)}></path>
	{/each}
</g>
