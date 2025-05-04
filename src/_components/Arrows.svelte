<!--
	@component
	Adds SVG swoopy arrows based on a config object. It attaches arrows to divs, which are created by another component such as [Annotations.html.svelte](https://layercake.graphics/components/Annotations.html.svelte).
 -->
<script>
	import { getContext, onMount, tick } from 'svelte';
	import { swoopyArrow, getElPosition, parseCssValue } from '../_modules/arrowUtils.js';

	/** @type {Array} annotations - A list of annotation objects. See the [Column](https://layercake.graphics/example/Column) chart example for the schema and options. */
	export let annotations = [];

	/** @type {String} [annotationClass='.layercake-annotation'] - The class name of the text annotation divs. */
	export let annotationClass = '.layercake-annotation';

	/** @type {String} [containerClass='.chart-container'] - The class name / CSS selector of the parent element of the `<LayerCake>` component. This is used to crawl the DOM for the text annotations. */
	export let containerClass = '.chart-container';

	let container;

	const { width, height, xScale, yScale, x, y } = getContext('LayerCake');

	/* --------------------------------------------
	 * Some lookups to convert between x, y / width, height terminology
	 * and CSS names
	 */
	const lookups = [
		{ dimension: 'width', css: 'left', position: 'x' },
		{ dimension: 'height', css: 'top', position: 'y' }
	];

	let d = () => '';
	let annotationEls;

	// This searches the DOM for the HTML annotations
	// in the Annotations.svelte componenent and then
	// attaches arrows to those divs
	// Make sure the `.chart-container` and `.layercake-annotation`
	// selectors match what you have in your project
	// otherwise it won't find anything
	onMount(async () => {
		await tick();
		annotationEls = Array.from(container.closest(containerClass).querySelectorAll(annotationClass));
	});

	function setPath(w, h) {
		return (anno, i, arrow) => {
			const el = annotationEls[i];

			/* --------------------------------------------
			 * Parse our attachment directives to know where to start the arrowhead
			 * measuring a bounding box based on our annotation el
			 */
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

			/* --------------------------------------------
			 * Default to clockwise
			 */
			const clockwise = typeof arrow.clockwise === 'undefined' ? true : arrow.clockwise;

			/* --------------------------------------------
			 * Parse where we're drawing to
			 * If we're passing in a percentage as a string then we need to convert it to pixel values
			 * Otherwise pass it to our xGet and yGet functions
			 */
			const targetCoords = [
				arrow.target.x || $x(arrow.target),
				arrow.target.y || $y(arrow.target)
			].map((q, j) => {
				const val =
					typeof q === 'string' && q.includes('%')
						? parseCssValue(q, j, w, h)
						: j
							? $yScale(q)
							: $xScale(q);
				return val + (arrow.target[`d${lookups[j].position}`] || 0);
			});

			/* --------------------------------------------
			 * Create arrow path
			 */
			return swoopyArrow()
				.angle(Math.PI / 2)
				.clockwise(clockwise)
				.x(q => q[0])
				.y(q => q[1])([sourceCoords, targetCoords]);
		};
	}

	$: if (annotationEls && annotationEls.length) d = setPath($width, $height);
</script>

<g bind:this={container}>
	{#if annotations.length}
		<g class="swoops">
			{#each annotations as anno, i}
				{#if anno.arrows}
					{#each anno.arrows as arrow}
						<path marker-end="url(#arrowhead)" d={d(anno, i, arrow)}></path>
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
