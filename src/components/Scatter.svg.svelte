<script>
	/**
		Generates an SVG scatter plot.
		@type {Number} [r=5] – The circle's radius.
		@type {String} [fill='#0cf'] – The circle's fill color.
		@type {String} [stroke='#000'] – The circle's stroke color.
		@type {Number} [strokeWidth=1] – The circle's stroke width.
	*/
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let r = 5;
	export let fill = '#0cf';
	export let stroke = '#000';
	export let strokeWidth = 0;
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d)}
			cy={$yGet(d)}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>
