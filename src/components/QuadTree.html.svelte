<script>
	/**
		Creates an interaction layer (in HTML) using [d3-quadtree](https://github.com/d3/d3-quadtree) to find the nearest datapoint to the mouse. This component creates a slot that exposes variables `x`, `y`, `found` (the found datapoint), `visible` (a Boolean whether any data was found) and `e` (the event object).

		The quadtree searches across both the x and y dimensions at the same time. But if you want to only search across one, set the `x` and `y` props to the same value. For example, the [shared tooltip component](https://layercake.graphics/components/SharedTooltip.html.svelte) sets `y='x'` since it's nicer behavior to only pick up on the nearest x-value.
		@type {String} [searchRadius=undefined] – The number of pixels to search around the mouse's location. This is the third argument passed to [`quadtree.find`](https://github.com/d3/d3-quadtree#quadtree_find) and by default a value of `undefined` means an unlimited range.
		@type {String} [x='x'] – The dimension to search across when moving the mouse left and right.
		@type {String} [y='y'] – The dimension to search across when moving the mouse up and down.
		@type {Array} [dataset=$data] – The dataset to work off of. You can pass something custom in here in case you don't want to use the main data or it's in a strange format.
	*/
	import { getContext } from 'svelte';
	import { quadtree } from 'd3-quadtree';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	let visible = false;
	let found = {};
	let e = {};

	export let dataset = undefined;
	export let x = 'x';
	export let y = 'y';
	export let searchRadius = undefined;

	$: xGetter = x === 'x' ? $xGet : $yGet;
	$: yGetter = y === 'y' ? $yGet : $xGet;

	function findItem (evt) {
		e = evt;

		const xLayerKey = `layer${x.toUpperCase()}`;
		const yLayerKey = `layer${y.toUpperCase()}`;

		console.log('evt', evt[xLayerKey], evt[yLayerKey]);

		found = finder.find(evt[xLayerKey], evt[yLayerKey], searchRadius) || {};
		visible = Object.keys(found).length > 0;
	}

	$: finder = quadtree()
		.extent([[-1, -1], [$width + 1, $height + 1]])
		.x(xGetter)
		.y(yGetter)
		.addAll(dataset || $data);
</script>

<style>
	.bg {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>

<div
	class="bg"
	on:mousemove="{findItem}"
	on:mouseout="{() => visible = false}"
	on:blur="{() => visible = false}"
></div>
<slot
	x={xGetter(found) || 0}
	y={yGetter(found) || 0}
	{found}
	{visible}
	{e}
></slot>
