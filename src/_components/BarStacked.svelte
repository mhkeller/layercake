<!--
	@component
	Generates an SVG stacked bar chart and sets the color via an ordinal scale in `cScale`.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();

	let columnWidth = $derived(d => {
		const xVals = c.xGet(d);
		return xVals[1] - xVals[0];
	});
</script>

<g class="bar-group">
	{#each c.data as series}
		{#each series as d, i}
			<rect
				class="group-rect"
				data-id={i}
				x={c.xGet(d)[0]}
				y={c.yGet(d)}
				height={c.yScale.bandwidth()}
				width={columnWidth(d)}
				fill={c.cGet(series)}
			></rect>
		{/each}
	{/each}
</g>
