<!--
	@component
	Generates an SVG line shape.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	
	/**
	 * @typedef {Object} Props
	 * @property {String} [stroke] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 */

	/** @type {Props} */
	let { stroke = '#ab00d6' } = $props();

	let path =
		$derived('M' +
		$data
			.map(d => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L'));
</script>

<path class="path-line" d={path} {stroke}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
