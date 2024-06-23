<!--
	@component
	Generates an SVG marker containing a marker for a triangle makes a nice arrowhead. Add it to the named slot called "defs" on the SVG layout component.
 -->
<script>
	/** @type {String} [fill='#000'] – The arrowhead's fill color. */
	export let fill = '#000';

	/** @type {String} [stroke='#000'] – The arrowhead's fill color. */
	export let stroke = '#000';
</script>

<marker id="arrowhead" viewBox="-10 -10 20 20" markerWidth="17" markerHeight="17" orient="auto">
	<path d="M-6,-6 L 0,0 L -6,6" {fill} {stroke} />
</marker>
