<!--
	@component
	Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
 -->
<script>
	/** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;

	/** @type {number} [r=3.5] - The point's radius. */
	export let r = 3.5;

	/** @type {string} [fill='yellow'] - The point's fill color. */
	export let fill = 'yellow';

	/** @type {string} [stroke='#000'] - The point's stroke color. */
	export let stroke = '#000';

	/** @type {number} [strokeWidth=1] - The point's stroke width. */
	export let strokeWidth = 1;

	/** @type {number} [opacity=1] - The point's opacity. */
	export let opacity = 1;

	/** @type {Array<Object>|undefined} [features] - A list of GeoJSON features to plot. If unset, the plotted features will defaults to those in `$data.features`, assuming this field a list of GeoJSON features. */
	export let features = undefined;

	$: projectionFn = projection().fitSize([$width, $height], $data);
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
