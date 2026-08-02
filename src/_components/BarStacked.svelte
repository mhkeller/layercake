<!--
	@component
	Generates an SVG stacked bar chart and sets the color via an ordinal scale in `cScale`.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	let columnWidth = $derived(d => {
		const xVals = cake.xGet(d);
		return xVals[1] - xVals[0];
	});
</script>

<g class="bar-group">
	{#each cake.data as series}
		{#each series as d, i}
			<rect
				class="group-rect"
				data-id={i}
				x={cake.xGet(d)[0]}
				y={cake.yGet(d)}
				height={cake.yScale.bandwidth()}
				width={columnWidth(d)}
				fill={cake.cGet(series)}
			></rect>
		{/each}
	{/each}
</g>
