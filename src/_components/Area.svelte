<!--
	@component
	Generates an SVG area shape.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale, extents } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#ab00d610'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610' } = $props();

	let path = $derived(
		'M' +
			$data
				.map((/** @type {object} */ d) => {
					return $xGet(d) + ',' + $yGet(d);
				})
				.join('L')
	);

	/**	@type {string} **/
	let area = $derived.by(() => {
		const yRange = $yScale.range();
		return (
			path +
			('L' +
				$xScale($extents.x ? $extents.x[1] : 0) +
				',' +
				yRange[0] +
				'L' +
				$xScale($extents.x ? $extents.x[0] : 0) +
				',' +
				yRange[0] +
				'Z')
		);
	});
</script>

<path class="path-area" d={area} {fill}></path>
