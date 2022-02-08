<!--
	@component
	Generates an SVG radial scale, useful for radar charts.
 -->
<script>
	import { getContext } from 'svelte';

	const { width, height, xScale, extents, config } = getContext('LayerCake');

	/** @type {Number} [lineLengthFactor=1.1] - How far to extend the lines from the circle's center. A value of `1` puts them at the circle's circumference. */
	export let lineLengthFactor = 1.1;

	/** @type {Number} [labelPlacementFactor=1.25] - How far to place the labels from the circle's center. A value of `1` puts them at the circle's circumference. */
	export let labelPlacementFactor = 1.25;

	$: max = $xScale(Math.max(...$extents.x));

	$: lineLength = max * lineLengthFactor;
	$: labelPlacement = max * labelPlacementFactor;

	$: angleSlice = (Math.PI * 2) / $config.x.length;

	function anchor (total, i) {
		if (i === 0 || i === total / 2) {
			return 'middle';
		} else if (i < total / 2) {
			return 'start';
		}
		return 'end';
	}
</script>

<g
	transform="translate({ $width / 2 }, { $height / 2 })"
>
	<circle
		cx="0"
		cy="0"
		r="{max}"
		stroke="#ccc"
		stroke-width="1"
		fill="#CDCDCD"
		fill-opacity="0.1"
	></circle>
	<circle
		cx="0"
		cy="0"
		r="{max / 2}"
		stroke="#ccc"
		stroke-width="1"
		fill="none"
	></circle>

	{#each $config.x as label, i}
		{@const thisAngleSlice = angleSlice * i - Math.PI / 2}
		<line
			x1="0"
			y1="0"
			x2="{lineLength * Math.cos(thisAngleSlice)}"
			y2="{lineLength * Math.sin(thisAngleSlice)}"
			stroke="#ccc"
			stroke-width="1"
			fill="none"
		>
		</line>
		<text
			text-anchor="{anchor($config.x.length, i)}"
			dy="0.35em"
			font-size="12px"
			text-outline="#fff"
			transform="translate({(labelPlacement) * Math.cos(thisAngleSlice)}, {labelPlacement * Math.sin(thisAngleSlice)})">{label}</text>
	{/each}
</g>
