<!--
	@component
	Adds text annotations that get their x and y placement using the `xScale` and `yScale`.
 -->
<script>
	import { getContext } from 'svelte';

	const { xGet, yGet, percentRange } = getContext('LayerCake');

	/** @type {Array} annotations - A list of annotation objects. */
	export let annotations = [];

	/** @type {Function} [getText=d => d.text] - An accessor function to get the field to display. */
	export let getText = d => d.text;

	/** @type {Boolean} [percentRange=false] - If `true` will set the `top` and `left` CSS positions to percentages instead of pixels. */
	export let pr = $percentRange;

	$: units = pr === true ? '%' : 'px';
</script>

<div class="layercake-annotations">
	{#each annotations as d, i}
		<div
			class="layercake-annotation"
			data-id={i}
			style:left={`calc(${$xGet(d)}${units} + ${d.dx || 0}px)`}
			style:top={`calc(${$yGet(d)}${units} + ${d.dy || 0}px)`}
		>
			{getText(d)}
		</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>
