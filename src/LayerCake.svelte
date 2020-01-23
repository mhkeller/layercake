<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';

	import makeAccessor from './utils/makeAccessor.js';
	import calcExtents from './lib/calcExtents.js';
	import calcDomain from './helpers/calcDomain.js';
	import createScale from './helpers/createScale.js';
	import createGetter from './helpers/createGetter.js';
	import defaultScales from './settings/defaultScales.js';

	export let width;
	export let height;

	export let containerWidth = width || 350;
	export let containerHeight = height || 250;

	/* --------------------------------------------
	 * Parameters
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 */
	export let x;
	export let y;
	export let z;
	export let r;
	export let custom = {};
	export let data = [];
	export let xDomain;
	export let yDomain;
	export let zDomain;
	export let rDomain;
	export let xNice = false;
	export let yNice = false;
	export let zNice = false;
	export let rNice = false;
	export let xReverse = false;
	export let yReverse = true;
	export let zReverse = false;
	export let rReverse = false;
	export let xPadding;
	export let yPadding;
	export let zPadding;
	export let rPadding;
	export let xScale = defaultScales.x;
	export let yScale = defaultScales.y;
	export let zScale = defaultScales.y;
	export let rScale = defaultScales.r;
	export let xRange;
	export let yRange;
	export let zRange;
	export let rRange;
	export let padding = {};
	export let flatData;

	/* --------------------------------------------
	 * Preserve a copy of our passed in settings before we modify them
	 * Return this to the user's context so they can reference things if need be
	 * Add the active keys since those aren't on our settings object.
	 * This is mostly an escape-hatch
	 */
	const originalSettings = {};
	$: if (x) originalSettings.x = x;
	$: if (y) originalSettings.y = y;
	$: if (z) originalSettings.z = z;
	$: if (r) originalSettings.r = r;
	$: if (xDomain) originalSettings.xDomain = xDomain;
	$: if (yDomain) originalSettings.yDomain = yDomain;
	$: if (zDomain) originalSettings.zDomain = zDomain;
	$: if (rDomain) originalSettings.rDomain = rDomain;
	$: if (xRange) originalSettings.xRange = xRange;
	$: if (yRange) originalSettings.yRange = yRange;
	$: if (zRange) originalSettings.zRange = zRange;
	$: if (rRange) originalSettings.rRange = rRange;

	/* --------------------------------------------
	 * Make store versions of each parameter
	 * Prefix these with `_` to keep things organized
	 */
	const _containerWidth = writable();
	const _containerHeight = writable();
	const _x = writable();
	const _y = writable();
	const _z = writable();
	const _r = writable();
	const _custom = writable();
	const _data = writable();
	const _xDomain = writable();
	const _yDomain = writable();
	const _zDomain = writable();
	const _rDomain = writable();
	const _xNice = writable();
	const _yNice = writable();
	const _zNice = writable();
	const _rNice = writable();
	const _xReverse = writable();
	const _yReverse = writable();
	const _zReverse = writable();
	const _rReverse = writable();
	const _xPadding = writable();
	const _yPadding = writable();
	const _zPadding = writable();
	const _rPadding = writable();
	const _xScale = writable();
	const _yScale = writable();
	const _zScale = writable();
	const _rScale = writable();
	const _xRange = writable();
	const _yRange = writable();
	const _zRange = writable();
	const _rRange = writable();
	const _padding = writable();
	const _flatData = writable();

	$: _containerWidth.set(containerWidth);
	$: _containerHeight.set(containerHeight);
	$: _x.set(makeAccessor(x));
	$: _y.set(makeAccessor(y));
	$: _z.set(makeAccessor(z));
	$: _r.set(makeAccessor(r));
	$: _xDomain.set(xDomain);
	$: _yDomain.set(yDomain);
	$: _zDomain.set(zDomain);
	$: _rDomain.set(rDomain);
	$: _custom.set(custom);
	$: _data.set(data);
	$: _xNice.set(xNice);
	$: _yNice.set(yNice);
	$: _zNice.set(zNice);
	$: _rNice.set(rNice);
	$: _xReverse.set(xReverse);
	$: _yReverse.set(yReverse);
	$: _zReverse.set(zReverse);
	$: _rReverse.set(rReverse);
	$: _xPadding.set(xPadding);
	$: _yPadding.set(yPadding);
	$: _zPadding.set(zPadding);
	$: _rPadding.set(rPadding);
	$: _xScale.set(xScale);
	$: _yScale.set(yScale);
	$: _zScale.set(zScale);
	$: _rScale.set(rScale);
	$: _xRange.set(xRange);
	$: _yRange.set(yRange);
	$: _zRange.set(zRange);
	$: _rRange.set(rRange);
	$: _padding.set(padding);
	$: _flatData.set(flatData || data);

	/* --------------------------------------------
	 * Create derived values
	 * Suffix these with `_d`
	 */
	const activeGetters_d = derived([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {
		return [
			{ field: 'x', accessor: $x },
			{ field: 'y', accessor: $y },
			{ field: 'z', accessor: $z },
			{ field: 'r', accessor: $r }
		].filter(d => d.accessor);
	});

	const padding_d = derived([_padding, _containerWidth, _containerHeight], ([$padding]) => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, $padding);
	});

	const box_d = derived([_containerWidth, _containerHeight, padding_d], ([$containerWidth, $containerHeight, $padding]) => {
		const b = {};
		b.top = $padding.top;
		b.right = $containerWidth - $padding.right;
		b.bottom = $containerHeight - $padding.bottom;
		b.left = $padding.left;
		b.width = b.right - b.left;
		b.height = b.bottom - b.top;
		if (b.width < 0 && b.height < 0) {
			console.error('[LayerCake] Target div has negative width and height. Did you forget to set a width or height on the container?');
		} else if (b.width < 0) {
			console.error('[LayerCake] Target div has a negative width. Did you forget to set that CSS on the container?');
		} else if (b.height < 0) {
			console.error('[LayerCake] Target div has negative height. Did you forget to set that CSS on the container?');
		}
		return b;
	});

	const width_d = derived([box_d], ([$box]) => {
		return $box.width;
	});

	const height_d = derived([box_d], ([$box]) => {
		return $box.height;
	});

	/* --------------------------------------------
	 * Calculate extents by taking the extent of the data
	 * and filling that in with anything set by the user
	 */
	const extents_d = derived([_flatData, activeGetters_d], ([$flatData, $activeGetters]) => {
		return calcExtents($flatData, $activeGetters);
	});

	const xDomain_d = derived([extents_d, _xDomain], calcDomain('x'));
	const yDomain_d = derived([extents_d, _yDomain], calcDomain('y'));
	const zDomain_d = derived([extents_d, _zDomain], calcDomain('z'));
	const rDomain_d = derived([extents_d, _rDomain], calcDomain('r'));

	const xScale_d = derived([_xScale, extents_d, xDomain_d, _xPadding, _xNice, _xReverse, width_d, height_d, _xRange], createScale('x'));
	const xGet_d = derived([_x, xScale_d], createGetter);

	const yScale_d = derived([_yScale, extents_d, yDomain_d, _yPadding, _yNice, _yReverse, width_d, height_d, _yRange], createScale('y'));
	const yGet_d = derived([_y, yScale_d], createGetter);

	const zScale_d = derived([_zScale, extents_d, zDomain_d, _zPadding, _zNice, _zReverse, width_d, height_d, _zRange], createScale('z'));
	const zGet_d = derived([_z, zScale_d], createGetter);

	const rScale_d = derived([_rScale, extents_d, rDomain_d, _rPadding, _rNice, _rReverse, width_d, height_d, _rRange], createScale('r'));
	const rGet_d = derived([_r, rScale_d], createGetter);

	$: context = {
		activeGetters: activeGetters_d,
		width: width_d,
		height: height_d,
		containerWidth: _containerWidth,
		containerHeight: _containerHeight,
		x: _x,
		y: _y,
		z: _z,
		r: _r,
		custom: _custom,
		data: _data,
		xNice: _xNice,
		yNice: _yNice,
		zNice: _zNice,
		rNice: _rNice,
		xReverse: _xReverse,
		yReverse: _yReverse,
		zReverse: _zReverse,
		rReverse: _rReverse,
		xPadding: _xPadding,
		yPadding: _yPadding,
		zPadding: _zPadding,
		rPadding: _rPadding,
		padding: padding_d,
		flatData: _flatData,
		extents: extents_d,
		xDomain: xDomain_d,
		yDomain: yDomain_d,
		zDomain: zDomain_d,
		rDomain: rDomain_d,
		originalSettings: writable(originalSettings),
		xScale: xScale_d,
		xGet: xGet_d,
		yScale: yScale_d,
		yGet: yGet_d,
		zScale: zScale_d,
		zGet: zGet_d,
		rScale: rScale_d,
		rGet: rGet_d
	};

	$: setContext('LayerCake', context);
</script>

<div
	class="layercake-container"
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
>
	<slot></slot>
</div>

<style>
	:global(.layercake-container),
	:global(.layercake-container *) {
		box-sizing: border-box;
	}
	.layercake-container {
		width: 100%;
		height: 100%;
	}
</style>
