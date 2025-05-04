<!--
	@component
	Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape) and sets the color via an ordinal scale in `zScale`. It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack).
 -->
<script>
	import { getContext } from 'svelte';
	import { area } from 'd3-shape';

	const { data, xGet, yScale, zGet } = getContext('LayerCake');

	let areaGen = $derived(area()
		.x(d => $xGet(d))
		.y0(d => $yScale(d[0]))
		.y1(d => $yScale(d[1])));
</script>

<g class="area-group">
	{#each $data as d}
		<path class="path-area" d={areaGen(d)} fill={$zGet(d)}></path>
	{/each}
</g>
