<script>
	import { run } from 'svelte/legacy';

	import { LayerCake, ScaledSvg, calcExtents } from 'layercake';
	import { tweened } from 'svelte/motion';
	import * as eases from 'svelte/easing';

	import Line from './Line.svelte';

	let { data, fullExtents, scale, extentGetters } = $props();

	const tweenOptions = {
		duration: 300,
		easing: eases.cubicInOut
	};

	const xDomain = tweened(undefined, tweenOptions);
	const yDomain = tweened(undefined, tweenOptions);

	const extents = calcExtents(data, extentGetters);

	run(() => {
		xDomain.set(scale === 'shared' ? fullExtents.x : extents.x);
	});
	run(() => {
		yDomain.set(scale === 'shared' ? fullExtents.y : extents.y);
	});
</script>

<LayerCake
	ssr
	percentRange
	padding={{ top: 2, right: 6, bottom: 2, left: 6 }}
	x={extentGetters.x}
	y={extentGetters.y}
	{data}
	xDomain={$xDomain}
	yDomain={$yDomain}
>
	<ScaledSvg>
		<Line stroke={'#000'} />
	</ScaledSvg>
</LayerCake>
