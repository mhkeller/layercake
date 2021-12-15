<script>
	/**
		Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
		@type {String} [fill='#ab00d610'] – The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color.
		@type {Function} [curve=curveLinear] – An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses.
	*/
	import { getContext } from 'svelte';
	import { area, curveLinear } from 'd3-shape';

	const { data, xGet, yGet, yScale } = getContext('LayerCake');

	export let fill = '#ab00d610';
	export let curve = curveLinear;

	$: path = area()
		.x($xGet)
		.y1($yGet)
		.y0(d => $yScale(0))
		.curve(curve);
		// .defined($y)
</script>

<path class='path-area' d='{path($data)}' {fill}></path>
