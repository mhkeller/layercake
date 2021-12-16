<script>
	/**
		Generates an SVG scatter plot. This component can also work if the x- or y-scale is ordinal, i.e. it has a `.bandwidth` method. See the [timeplot chart](https://layercake.graphics/example/Timeplot) for an example.
		@type {Number} [r=5] – The circle's radius.
		@type {String} [fill='#0cf'] – The circle's fill color.
		@type {String} [stroke='#000'] – The circle's stroke color.
		@type {Number} [strokeWidth=1] – The circle's stroke width.
	*/
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext('LayerCake');

	export let r = 5;
	export let fill = '#0cf';
	export let stroke = '#000';
	export let strokeWidth = 0;
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}
			cy={$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>
