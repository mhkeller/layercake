<!--
	@component
	Finds the data point nearest the mouse with [d3-quadtree](https://github.com/d3/d3-quadtree) and renders its `children` snippet with the result: `x` and `y` are the point's position as percentages, for a `percentRange={true}` chart, `found` is its row, `visible` is whether a point was found and `e` is the mouse event.

	The search covers both dimensions. To search one only, set `x` and `y` to the same dimension. The [shared tooltip](https://layercake.graphics/components/SharedTooltip.percent-range.html.svelte) sets `y='x'` so it snaps to the nearest x value.
 -->
<script>
	import { quadtree } from 'd3-quadtree';
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	let visible = $state(false);
	/** @type {Record<string, any>} */
	let found = $state({});
	/** @type {MouseEvent|undefined} */
	let e = $state();

	/**
	 * What the `children` snippet receives: the nearest point's position as percentages, its row, whether a point was found and the mouse event.
	 * @typedef {{ x: number, y: number, found: Record<string, any>, visible: boolean, e: MouseEvent|undefined }} Nearest
	 */

	/**
	 * @typedef {Object} Props
	 * @property {'x'|'y'} [x='x'] - The dimension a left-right mouse move searches. Set `x` and `y` to the same dimension to search one only.
	 * @property {'x'|'y'} [y='y'] - The dimension an up-down mouse move searches.
	 * @property {number|undefined} [searchRadius] - How many pixels around the mouse to search. Unlimited by default. Passed to [quadtree.find](https://github.com/d3/d3-quadtree#quadtree_find).
	 * @property {Array<Object>|undefined} [dataset] - Rows to search, defaulting to `k.data`. Pass your own list when the chart data is nested or reshaped.
	 * @property {import('svelte').Snippet<[Nearest]>} [children] - Renders with the nearest point. See the `Nearest` typedef above for what it gets.
	 */

	/** @type {Props} */
	let { x = 'x', y = 'y', searchRadius, dataset, children } = $props();

	let xGetter = $derived(x === 'x' ? k.xGet : k.yGet);
	let yGetter = $derived(y === 'y' ? k.yGet : k.xGet);

	/** @param {MouseEvent} evt */
	function findItem(evt) {
		e = evt;

		// The mouse position as percentages of the chart, swapped when a prop points at the other dimension
		const [px, py] = k.pointer(evt);
		const xVal = (x === 'x' ? px / k.width : py / k.height) * 100;
		const yVal = (y === 'y' ? py / k.height : px / k.width) * 100;

		found = finder.find(xVal, yVal, searchRadius) || {};
		visible = Object.keys(found).length > 0;
	}

	let finder = $derived(
		quadtree()
			.extent([
				[-1, -1],
				[k.width + 1, k.height + 1]
			])
			.x(xGetter)
			.y(yGetter)
			.addAll(dataset || k.data)
	);
</script>

<!-- The hit area only tracks the mouse. It is hidden from screen readers and has no keyboard path. -->
<!-- svelte-ignore a11y_mouse_events_have_key_events, a11y_no_static_element_interactions -->
<div
	class="bg"
	onmousemove={findItem}
	onmouseout={() => (visible = false)}
	aria-hidden="true"
></div>
{@render children?.({ x: xGetter(found) || 0, y: yGetter(found) || 0, found, visible, e })}

<style>
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
