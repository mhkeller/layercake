<!--
	@component
	Draws one server-side rendered small multiple: a line chart whose domains ease between its own extents and the shared extents of the whole set. Used by the [SSR small multiples example](https://layercake.graphics/example-ssr/SmallMultiples).
 -->
<script>
	import { LayerCake, ScaledSvg, calcExtents } from 'layercake';
	import { Tween } from 'svelte/motion';
	import * as eases from 'svelte/easing';

	import Line from './Line.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {Array<Object>} data - The rows for this one chart.
	 * @property {Record<string, [any, any]>} fullExtents - The x and y extents across every chart, as `calcExtents` returns them. Used when `scale` is 'shared'.
	 * @property {'shared'|'individual'} scale - Whether the domains come from every chart or from this chart's own rows.
	 * @property {Record<string, (d: any) => any>} extentGetters - The x and y accessors, e.g. `{ x: d => d.x, y: d => d.y }`.
	 */

	/** @type {Props} */
	let { data, fullExtents, scale, extentGetters } = $props();

	const tweenOptions = {
		duration: 300,
		easing: eases.cubicInOut
	};

	let extents = $derived(calcExtents(data, extentGetters));

	// Each domain eases to its new target whenever `scale` flips or the rows change
	const xDomain = Tween.of(() => (scale === 'shared' ? fullExtents.x : extents.x), tweenOptions);
	const yDomain = Tween.of(() => (scale === 'shared' ? fullExtents.y : extents.y), tweenOptions);
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
		<Line stroke="#000" />
	</ScaledSvg>
</LayerCake>
