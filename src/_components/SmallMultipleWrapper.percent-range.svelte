<script>
	import { LayerCake, ScaledSvg, calcExtents } from 'layercake';
	import { Tween } from 'svelte/motion';
	import * as eases from 'svelte/easing';

	import Line from './Line.svelte';

	let { data, fullExtents, scale, extentGetters } = $props();

	const tweenOptions = {
		duration: 300,
		easing: eases.cubicInOut
	};

	const extents = calcExtents(data, extentGetters);

	const xDomain = new Tween(scale === 'shared' ? fullExtents.x : extents.x, tweenOptions);
	const yDomain = new Tween(scale === 'shared' ? fullExtents.y : extents.y, tweenOptions);

	$effect(() => {
		xDomain.target = scale === 'shared' ? fullExtents.x : extents.x;
	});
	$effect(() => {
		yDomain.target = scale === 'shared' ? fullExtents.y : extents.y;
	});
</script>

<LayerCake
	ssr
	percentRange
	padding={{ top: 2, right: 6, bottom: 2, left: 6 }}
	x={extentGetters.x}
	y={extentGetters.y}
	{data}
	xDomain={xDomain.current}
	yDomain={yDomain.current}
>
	<ScaledSvg>
		<Line stroke={'#000'} />
	</ScaledSvg>
</LayerCake>
