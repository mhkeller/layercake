<!--
	@component
	Generates an SVG `<marker>` with a triangle for an arrowhead. Add it through the `defs` snippet of the `<Svg>` layout, then point a path's `marker-end` at `url(#arrowhead)`.
 -->
<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [fill='#000'] - The arrowhead's fill color.
	 * @property {string} [stroke='#000'] - The arrowhead's stroke color.
	 */

	/** @type {Props} */
	let { fill = '#000', stroke = '#000' } = $props();
</script>

<marker id="arrowhead" viewBox="-10 -10 20 20" markerWidth="17" markerHeight="17" orient="auto">
	<path d="M-6,-6 L 0,0 L -6,6" {fill} {stroke} />
</marker>
