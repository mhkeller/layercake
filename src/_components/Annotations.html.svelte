<!--
	@component
	Adds text annotations based on a config object that has CSS styles as fields.
 -->
<script>
	/** @typedef {Object} Positions */
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
	 * @property {Array<Annotation>} annotations - A list of annotation objects. It expects values of `top`, `right`, `bottom` and `left` whose values are CSS values like `'10px'` or `'5%'` that will be used to absolutely position the text div.
	 * @property {Function} [getText] - An accessor function to get the field to display.
	 */

	/** @type {Props} */
	let { annotations, getText = /** @param {Annotation} d */ d => d.text } = $props();

	let fillStyle = $derived((/** @type {Record<string, any>} */ d) => {
		let style = '';
		positions.forEach(pos => {
			if (d[pos]) {
				style += `${pos}:${d[pos]};`;
			}
		});
		return style;
	});
</script>

<div class="layercake-annotations">
	{#each annotations as d, i}
		<div class="layercake-annotation" data-id={i} style={fillStyle(d)}>{getText(d)}</div>
	{/each}
</div>

<style>
	.layercake-annotation {
		position: absolute;
	}
</style>
