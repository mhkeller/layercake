<!--
	@component
	Generates an SVG stacked bar chart and sets the color via an ordinal scale in `cScale`.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	let columnWidth = $derived(d => {
		const xVals = k.xGet(d);
		return xVals[1] - xVals[0];
	});
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
				width={columnWidth(d)}
				fill={k.cGet?.(series) ?? '#ccc'}
			></rect>
		{/each}
	{/each}
</g>
