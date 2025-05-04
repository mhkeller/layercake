<!--
	@component
	Adds text annotations based on a config object that has CSS styles as fields.
 -->
<script>
	const vals = ['top', 'right', 'bottom', 'left'];

	

	
	/**
	 * @typedef {Object} Props
	 * @property {Array} [annotations] - A list of annotation objects. It expects values of `top`, `right`, `bottom` and `left` whose values are CSS values like `'10px'` or `'5%'` that will be used to absolutely position the text div. See the [Column](https://layercake.graphics/example/Column) chart example for the schema and options.
	 * @property {Function} [getText] - An accessor function to get the field to display.
	 */

	/** @type {Props} */
	let { annotations = [], getText = d => d.text } = $props();

	let fillStyle = $derived(d => {
		let style = '';
		vals.forEach(val => {
			if (d[val]) {
				style += `${val}:${d[val]};`;
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
