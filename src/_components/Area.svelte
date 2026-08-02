<!--
	@component
	Generates an SVG area shape.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const cake = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#ab00d610'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610' } = $props();

	let path = $derived(
		'M' +
			cake.data
				.map((/** @type {object} */ d) => {
					return cake.xGet(d) + ',' + cake.yGet(d);
				})
				.join('L')
	);

	/**	@type {string} **/
	let area = $derived.by(() => {
		const yRange = cake.yScale.range();
		return (
			path +
			('L' +
				cake.xScale(cake.extents.x ? cake.extents.x[1] : 0) +
				',' +
				yRange[0] +
				'L' +
				cake.xScale(cake.extents.x ? cake.extents.x[0] : 0) +
				',' +
				yRange[0] +
				'Z')
		);
	});
</script>

<path class="path-area" d={area} {fill}></path>
