<!--
	@component
	Adds SVG swoopy arrows based on a config object. It attaches arrows to divs, which are created by another component such as [Annotations.html.svelte](https://layercake.graphics/components/Annotations.html.svelte).
 -->
<script>
	import { tick } from 'svelte';
	import { getLayerCakeContext } from 'layercake';
	import { swoopyArrow, getElPosition, parseCssValue } from '../_modules/arrowUtils.js';

	const k = getLayerCakeContext();

	/**
	 * Where an arrow starts, on the annotation's text box.
	 * @typedef {Object} ArrowSource
	 * @property {string} anchor - A spot on the box as `horizontal-vertical`, e.g. `'right-middle'`. Horizontal is `left`, `middle` or `right`. Vertical is `top`, `middle` or `bottom`.
	 * @property {number|string} [dx] - Horizontal nudge, in pixels or as a percentage of the box width.
	 * @property {number|string} [dy] - Vertical nudge, in pixels or as a percentage of the box height.
	 */

	/**
	 * Where an arrow ends. Either a percentage of the chart, like `'68%'`, or a
	 * data value that goes through the x and y scales. Leave `x` or `y` out to
	 * read it from the annotation with the chart's x or y accessor instead.
	 * @typedef {Object} ArrowTarget
	 * @property {string|number} [x] - The x position.
	 * @property {string|number} [y] - The y position.
	 * @property {number|string} [dx] - Horizontal nudge, in pixels or as a percentage of the chart width.
	 * @property {number|string} [dy] - Vertical nudge, in pixels or as a percentage of the chart height.
	 */

	/**
	 * @typedef {Object} Arrow
	 * @property {boolean} [clockwise=true] - Which way the arrow bows.
	 * @property {ArrowSource} source - Where the arrow starts.
	 * @property {ArrowTarget} target - Where the arrow ends.
	 */

	/**
	 * One annotation, the same object that Annotations.html.svelte or
	 * AnnotationsData.html.svelte draws the text for. Only `arrows` matters here.
	 * @typedef {Object} Annotation
	 * @property {string} text - The annotation's text.
	 * @property {Array<Arrow>} [arrows] - The arrows to draw from this annotation.
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<Annotation>} annotations - The annotations, in the same order the text component rendered them. See the [Column example](https://layercake.graphics/example/Column) for a full config.
	 * @property {string} [containerClass='.chart-container'] - The CSS selector of the element wrapping the `<LayerCake>` component. The arrows crawl it for the annotation divs.
	 * @property {string} [annotationClass='.layercake-annotation'] - The CSS selector of the annotation divs.
	 */

	/** @type {Props} */
	let {
		annotations,
		containerClass = '.chart-container',
		annotationClass = '.layercake-annotation'
	} = $props();

	/** @type {SVGGElement|undefined} */
	let container = $state();

	// The x side of an arrow works in `left` and `width`, the y side in `top` and `height`
	/** @type {Array<{ dimension: 'width'|'height', css: 'left'|'top', position: 'x'|'y' }>} */
	const lookups = [
		{ dimension: 'width', css: 'left', position: 'x' },
		{ dimension: 'height', css: 'top', position: 'y' }
	];

	/** @type {Array<Element>} */
	let annotationEls = $state([]);

	// Find the annotation divs the text component rendered, once the DOM has
	// caught up, and again whenever the annotations change. The selectors have to
	// match your markup, or nothing is found.
	$effect(() => {
		annotations;
		tick().then(() => {
			const parent = container?.closest(containerClass);
			annotationEls = parent ? Array.from(parent.querySelectorAll(annotationClass)) : [];
		});
	});

	/**
	 * @param {number} i The annotation's index.
	 * @param {Arrow} arrow
	 */
	function getArrowPath(i, arrow) {
		const el = annotationEls[i];
		if (!el) return '';

		// Work out where the arrow starts: the spot on the annotation div named
		// by `source.anchor`, plus any offset
		const arrowSource = getElPosition(el);
		const sourceCoords = arrow.source.anchor.split('-').map((q, j) => {
			const { css, dimension, position } = lookups[j];
			// 'middle' is halfway along the side. Anything else names an edge of the box.
			const point =
				q === 'middle'
					? arrowSource[css] + arrowSource[dimension] / 2
					: arrowSource[/** @type {'left'|'right'|'top'|'bottom'} */ (q)];
			return (
				point +
				parseCssValue(arrow.source[`d${position}`], j, arrowSource.width, arrowSource.height)
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
			return val + parseCssValue(arrow.target[`d${lookups[j].position}`], j, k.width, k.height);
		});

		// Draw the arc from source to target
		const arc = swoopyArrow();
		arc.angle(Math.PI / 2);
		arc.clockwise(clockwise);
		arc.x(q => q[0]);
		arc.y(q => q[1]);
		return arc([sourceCoords, targetCoords]);
	}
</script>

<g bind:this={container}>
	{#if annotations.length}
		<g class="swoops">
			{#each annotations as anno, i}
				{#if anno.arrows}
					{#each anno.arrows as arrow}
						<path marker-end="url(#arrowhead)" d={getArrowPath(i, arrow)}></path>
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
