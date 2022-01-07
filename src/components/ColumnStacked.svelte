<!--
	@component
	Generates an SVG column chart. It uses the z-scale for color assignments and aassumes both `xScale` and `zScale` are ordinal scales.  It assumes your data is in a [D3 stack format](https://github.com/d3/d3-shape#stack
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');

	$: columnHeight = d => {
		const yVals = $yGet(d);
		return yVals[0] - yVals[1];
	};
</script>

<g class="column-group">
	{#each $data as series, i}
		{#each series as d}
			<rect
				class='group-rect'
				data-id="{i}"
				x="{$xGet(d)}"
				y="{$yGet(d)[1]}"
				width={$xScale.bandwidth()}
				height="{columnHeight(d)}"
				fill={$zGet(series)}
			></rect>
		{/each}
	{/each}
</g>
