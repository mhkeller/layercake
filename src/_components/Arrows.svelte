<!--
	@component
	Adds SVG swoopy arrows based on a config object. It attaches arrows to divs, which are created by another component such as [Annotations.html.svelte](https://layercake.graphics/components/Annotations.html.svelte).
 -->
<script>
	// @ts-nocheck
	import { onMount, tick } from 'svelte';
	import { getLayerCakeContext } from 'layercake';
	import { swoopyArrow, getElPosition, parseCssValue } from '../_modules/arrowUtils.js';

	/**
	 * @typedef {Object} Annotation TODO: Add the schema for the annotation object.
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<Annotation>} annotations - A list of annotation objects. See the [Column](https://layercake.graphics/example/Column) chart example for the schema and options.
	 * @property {string} [containerClass=".chart-container"] - The class name / CSS selector of the parent element of the `<LayerCake>` component. This is used to crawl the DOM for the text annotations.
	 * @property {string} [annotationClass=".layercake-annotation"] -The class name / CSS selector of the text annotation divs.
	 */

	/** @type {Props} */
	let {
		annotations,
		containerClass = '.chart-container',
		annotationClass = '.layercake-annotation'
	} = $props();

	let container = $state();

	const k = getLayerCakeContext();

	// Lookups to convert between the x/y and width/height names used here and
	// their CSS names
	const lookups = [
		{ dimension: 'width', css: 'left', position: 'x' },
		{ dimension: 'height', css: 'top', position: 'y' }
	];

	let annotationEls = $state();

	// Find the annotation divs that Annotations.html.svelte rendered and attach
	// an arrow to each one. The `.chart-container` and `.layercake-annotation`
	// selectors have to match your project, or nothing will be found.
	onMount(async () => {
		await tick();
		annotationEls = Array.from(container.closest(containerClass).querySelectorAll(annotationClass));
	});

	function getArrowPath(anno, i, arrow) {
		if (!annotationEls || !annotationEls[i]) return '';

		const el = annotationEls[i];

		// Work out where the arrow starts: the spot on the annotation div named
		// by `source.anchor`, plus any offset
		const arrowSource = getElPosition(el);
		const sourceCoords = arrow.source.anchor.split('-').map((q, j) => {
			const point =
				q === 'middle'
					? arrowSource[lookups[j].css] + arrowSource[lookups[j].dimension] / 2
					: arrowSource[q];
			return (
				point +
				parseCssValue(
					arrow.source[`d${lookups[j].position}`],
					i,
					arrowSource.width,
					arrowSource.height
				)
			);
		});

		// Default to clockwise
		const clockwise = typeof arrow.clockwise === 'undefined' ? true : arrow.clockwise;

		// Work out where the arrow ends. A percentage string like '50%' is
		// measured against the chart. Anything else is a data value that goes
		// through the x and y scales.
		const targetCoords = [
			arrow.target.x || k.x(arrow.target),
			arrow.target.y || k.y(arrow.target)
		].map((q, j) => {
			const val =
				typeof q === 'string' && q.includes('%')
					? parseCssValue(q, j, k.width, k.height)
					: j
						? k.yScale(q)
						: k.xScale(q);
			return val + (arrow.target[`d${lookups[j].position}`] || 0);
		});

		// Create arrow path
		return swoopyArrow()
			.angle(Math.PI / 2)
			.clockwise(clockwise)
			.x(q => q[0])
			.y(q => q[1])([sourceCoords, targetCoords]);
	}
</script>

<g bind:this={container}>
	{#if annotations.length}
		<g class="swoops">
			{#each annotations as anno, i}
				{#if anno.arrows}
					{#each anno.arrows as arrow}
						<path marker-end="url(#arrowhead)" d={getArrowPath(anno, i, arrow)}></path>
					{/each}
				{/if}
			{/each}
		</g>
	{/if}
</g>

<style>
	.swoops {
		position: absolute;
		max-width: 200px;
		line-height: 14px;
	}
	.swoops path {
		fill: none;
		stroke: #000;
		stroke-width: 1;
	}
</style>
