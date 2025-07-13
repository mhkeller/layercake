<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
	 * @property {number} [r=3.5] - The point's radius.
	 * @property {string} [fill='yellow'] - The point's fill color.
	 * @property {string} [stroke='#000'] - The point's stroke color.
	 * @property {number} [strokeWidth=1] - The point's stroke width.
	 * @property {number} [opacity=1] - The point's opacity.
	 * @property {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features.
	 */

	/** @type {Props} */
	let {
		projection,
		r = 3.5,
		fill = 'yellow',
		stroke = '#000',
		strokeWidth = 1,
		opacity = 1,
		features
	} = $props();

	let projectionFn = $derived(projection().fitSize([$width, $height], $data));
</script>

<g class="points">
	{#each features || $data.features as d}
		<!-- To scale the circle by size, set r to `$rGet(d.properties)` -->
		<circle
			cx={projectionFn(d.geometry.coordinates)[0]}
			cy={projectionFn(d.geometry.coordinates)[1]}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
			{opacity}
		/>
	{/each}
</g>
