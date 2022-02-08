<!--
	@component
	Generates an SVG stacked bar chart and sets the color via an ordinal scale in `zScale`.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zGet, yScale } = getContext('LayerCake');

	$: columnWidth = d => {
		const xVals = $xGet(d);
		return xVals[1] - xVals[0];
	};
</script>

<g class="bar-group">
	{#each $data as series}
		{#each series as d, i}
			<rect
				class='group-rect'
				data-id="{i}"
				x="{$xGet(d)[0]}"
				y="{$yGet(d)}"
				height={$yScale.bandwidth()}
				width="{columnWidth(d)}"
				fill={$zGet(series)}
			></rect>
		{/each}
	{/each}
</g>
