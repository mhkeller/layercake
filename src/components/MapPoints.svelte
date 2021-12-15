<script>
	/**
		Generates canvas dots onto a map using [d3-geo](https://github.com/d3/d3-geo).
		@type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`.
		@type {Array} [features=$data.features] – A list of GeoJSOn features. By default, assumes `$data` is a GeoJSON Feature Collection and uses those features.
		@type {Number} [r=3.5] – The point's radius.
		@type {String} [fill='yellow'] – The point's fill color.
		@type {String} [stroke='#000'] – The point's stroke color.
		@type {Number} [strokeWidth=1] – The point's stroke width.
	*/
	import { getContext } from 'svelte';

	const { data, width, height } = getContext('LayerCake');

	/* --------------------------------------------
	 * Require a D3 projection function
	 */
	export let projection;
	export let features = $data.features;
	export let r = 3.5;
	export let fill = 'yellow';
	export let stroke = '#000';
	export let strokeWidth = 1;
	export let opacity = 1;

	$: projectionFn = projection()
		.fitSize([$width, $height], $data);
</script>

<g class="points">
{#each features as d}
	<!-- To scale the circle by size, set r to `$rGet(d.properties)` -->
	<circle
		cx={projectionFn(d.geometry.coordinates)[0]}
		cy={projectionFn(d.geometry.coordinates)[1]}
		r="{r}"
		fill="{fill}"
		stroke="{stroke}"
		stroke-width="{strokeWidth}"
		opacity="{opacity}"
	/>
{/each}
</g>
