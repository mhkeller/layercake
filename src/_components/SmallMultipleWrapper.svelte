<script>
	import { LayerCake, Svg, calcExtents } from 'layercake';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';

	import Line from './Line.svelte';

	export let data;
	export let fullExtents;
	export let scale;
	export let extentGetters;

	const tweenOptions = {
		duration: 300,
		easing: eases.cubicInOut
	};

	const xDomain = tweened(undefined, tweenOptions);
	const yDomain = tweened(undefined, tweenOptions);

	const extents = calcExtents(data, extentGetters);

	$: xDomain.set(scale === 'shared' ? fullExtents.x : extents.x);
	$: yDomain.set(scale === 'shared' ? fullExtents.y : extents.y);
</script>

<LayerCake
	padding={{ top: 2, right: 6, bottom: 2, left: 6 }}
	x={extentGetters.x}
	y={extentGetters.y}
	{data}
	xDomain={$xDomain}
	yDomain={$yDomain}
>
	<Svg>
		<Line stroke={'#000'} />
	</Svg>
</LayerCake>
