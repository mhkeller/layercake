<!--
	@component
	Generates an SVG area shape.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#ab00d610'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610' } = $props();

	let path = $derived(
		'M' +
			c.data
				.map((/** @type {object} */ d) => {
					return c.xGet(d) + ',' + c.yGet(d);
				})
				.join('L')
	);

	/**	@type {string} **/
	let area = $derived.by(() => {
		const yRange = c.yScale.range();
		return (
			path +
			('L' +
				c.xScale(c.extents.x ? c.extents.x[1] : 0) +
				',' +
				yRange[0] +
				'L' +
				c.xScale(c.extents.x ? c.extents.x[0] : 0) +
				',' +
				yRange[0] +
				'Z')
		);
	});
</script>

<path class="path-area" d={area} {fill}></path>
