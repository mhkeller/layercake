<!--
	@component
	Adds HTML text annotations, each placed with the CSS `top`, `right`, `bottom` and `left` values in its config.
 -->
<script>
	/** @type {Array<'top'|'right'|'bottom'|'left'>} */
	const positions = ['top', 'right', 'bottom', 'left'];

	/**
	 * @typedef {Object} Annotation
	 * @property {string} text - The text content of the annotation
	 * @property {string} [top] - CSS top position in pixels or percentage
	 * @property {string} [right] - CSS right position in pixels or percentage
	 * @property {string} [bottom] - CSS bottom position in pixels or percentage
	 * @property {string} [left] - CSS left position in pixels or percentage
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Array<Annotation>} annotations - The annotations to draw. Each has `text` plus any of `top`, `right`, `bottom` and `left` as CSS values like `'10px'` or `'5%'`.
	 * @property {(d: Annotation) => string} [getLabel=d => d.text] - Returns the text for an annotation.
	 */

	/** @type {Props} */
	let { annotations, getLabel = d => d.text } = $props();

	// Only the sides the annotation sets end up in its style
	/** @param {Annotation} d */
	function positionStyle(d) {
		return positions
			.filter(pos => d[pos])
			.map(pos => `${pos}:${d[pos]};`)
			.join('');
	}
</script>

<div class="layercake-annotations">
	{#each annotations as d, i}
		<div class="layercake-annotation" data-id={i} style={positionStyle(d)}>{getLabel(d)}</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>
