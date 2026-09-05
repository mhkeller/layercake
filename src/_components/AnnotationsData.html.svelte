<!--
	@component
	Adds HTML text annotations placed by the chart's x and y scales, so they sit on the data.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * One annotation. The chart's x and y accessors read its data fields for
	 * the position, so it carries whatever keys those accessors look up.
	 * @typedef {Object} Annotation
	 * @property {string} text - The annotation's text.
	 * @property {number} [dx] - Horizontal nudge in pixels.
	 * @property {number} [dy] - Vertical nudge in pixels.
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<Annotation>} annotations - The annotations to draw.
	 * @property {(d: Annotation) => string} [getLabel=d => d.text] - Returns the text for an annotation.
	 * @property {'px'|'%'} [units] - Position with pixels or percentages. Defaults to `'%'` when `percentRange={true}`, otherwise `'px'`.
	 */

	/** @type {Props} */
	let {
		annotations,
		getLabel = d => d.text,
		units = k.percentRange === true ? '%' : 'px'
	} = $props();
</script>

<div class="layercake-annotations">
	{#each annotations as d, i}
		<div
			class="layercake-annotation"
			data-id={i}
			style:left={`calc(${k.xGet(d)}${units} + ${d.dx || 0}px)`}
			style:top={`calc(${k.yGet(d)}${units} + ${d.dy || 0}px)`}
		>
			{getLabel(d)}
		</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>
