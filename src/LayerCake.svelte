<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';

	import makeAccessor from './utils/makeAccessor.js';
	import calcExtents from './lib/calcExtents.js';
	import partialDomain from './utils/partialDomain.js';
	import getDefaultRange from './settings/getDefaultRange.js';
	import defaultScales from './settings/defaultScales.js';
	import padScale from './utils/padScale.js';

	export let containerWidth = 345;
	export let containerHeight = 140;

	/* --------------------------------------------
	 * Parameters
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 */
	export let x;
	export let y;
	export let r;
	export let custom = {};
	export let data = [];
	export let xDomain;
	export let yDomain;
	export let rDomain;
	export let xNice = false;
	export let yNice = false;
	export let rNice = false;
	export let reverseX = false;
	export let reverseY = true;
	export let xPadding;
	export let yPadding;
	export let rPadding;
	export let xScale = defaultScales.x;
	export let yScale = defaultScales.y;
	export let rScale = defaultScales.r;
	export let rRange;
	export let padding = {};
	export let flatData;

	/* --------------------------------------------
	 * Preserve a copy of our passed in settings before we modify them
	 * Return this to the user's context so they can reference things if need be
	 * Add the active keys since those aren't on our settings object.
	 * This is mostly an escape-hatch
	 */
	const originalSettings = {}
	$: if (xDomain) originalSettings.xDomain = xDomain;
	$: if (yDomain) originalSettings.yDomain = yDomain;
	$: if (rDomain) originalSettings.rDomain = rDomain;
	$: if (x) originalSettings.x = x;
	$: if (y) originalSettings.y = y;
	$: if (r) originalSettings.r = r;

	/* --------------------------------------------
	 * Make store versions of each parameter
	 *
	 */
	const _containerWidth = writable();
	const _containerHeight = writable();
	const _x = writable();
	const _y = writable();
	const _r = writable();
	const _custom = writable();
	const _data = writable();
	const _xDomain = writable();
	const _yDomain = writable();
	const _rDomain = writable();
	const _xNice = writable();
	const _yNice = writable();
	const _rNice = writable();
	const _reverseX = writable();
	const _reverseY = writable();
	const _xPadding = writable();
	const _yPadding = writable();
	const _rPadding = writable();
	const _xScale = writable();
	const _yScale = writable();
	const _rScale = writable();
	const _rRange = writable();
	const _padding = writable();
	const _flatData = writable();

	$: _containerWidth.set(containerWidth);
	$: _containerHeight.set(containerHeight);
	$: _x.set(makeAccessor(x));
	$: _y.set(makeAccessor(y));
	$: _r.set(makeAccessor(r));

	$: _custom.set(custom);
	$: _data.set(data);
	$: _xNice.set(xNice);
	$: _yNice.set(yNice);
	$: _rNice.set(rNice);
	$: _reverseX.set(reverseX);
	$: _reverseY.set(reverseY);
	$: _xPadding.set(xPadding);
	$: _yPadding.set(yPadding);
	$: _rPadding.set(rPadding);
	$: _xScale.set(xScale);
	$: _yScale.set(yScale);
	$: _rScale.set(rScale);
	$: _rRange.set(rRange);
	$: _padding.set(padding);
	$: _flatData.set(flatData || data);

	const _activeGetters = writable();

	$: _activeGetters.set([
		{ field: 'x', accessor: $_x },
		{ field: 'y', accessor: $_y },
		{ field: 'r', accessor: $_r }
	].filter(d => d.accessor));

	/* --------------------------------------------
	 * Calculate domains by taking the extent of the data
	 * and filling that in with anything set by the user
	 */
	const _extents = writable();
	$: _extents.set(calcExtents($_flatData, $_activeGetters));

	$: _xDomain.set($_extents ? partialDomain($_extents.x, xDomain) : null);
	$: _yDomain.set($_extents ? partialDomain($_extents.y, yDomain) : null);
	$: _rDomain.set($_extents ? partialDomain($_extents.r, rDomain) : null);

	/* --------------------------------------------
	 * Set up derived properties
	 *
	 * TODO, add ability to take padding from css padding
	 */

	const context = {
		containerWidth: _containerWidth,
		containerHeight: _containerHeight,
		x: _x,
		y: _y,
		r: _r,
		custom: _custom,
		data: _data,
		xNice: _xNice,
		yNice: _yNice,
		rNice: _rNice,
		reverseX: _reverseX,
		reverseY: _reverseY,
		xPadding: _xPadding,
		yPadding: _yPadding,
		rPadding: _rPadding,
		xScale: _xScale,
		yScale: _yScale,
		rScale: _rScale,
		rRange: _rRange,
		padding: _padding,
		flatData: _flatData,
		extents: _extents,
		xDomain: _xDomain,
		yDomain: _yDomain,
		rDomain: _rDomain,
		originalSettings: writable(originalSettings)
	};

	$: context.padding = derived([context.containerWidth, context.containerHeight], () => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, $_padding);
	});

	$: context.box = derived([context.containerWidth, context.containerHeight, context.padding], ([$containerWidth, $containerHeight, $padding]) => {
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

	$: context.width = derived([context.box], ([$box]) => {
		return $box.width;
	});

	$: context.height = derived([context.box], ([$box]) => {
		return $box.height;
	});

	function createScale (which) {
		return function scaleCreator ([$scale, $limit, $extents, $domain, $padding, $nice, $reverse]) {
			if ($extents === null) {
				return null;
			}

			const defaultRange = $reverse === true ? [$limit, 0] : [which === 'r' ? 1 : 0, $limit];

			const scale = $scale === defaultScales[which] ? $scale() : $scale.copy();

			/* --------------------------------------------
			 * On creation, `$domain` will already have any nulls filled in
			 * But if we set it via the context it might not, so rerun it through partialDomain
			 */
			scale
				.domain(partialDomain($extents[which], $domain))
				.range(defaultRange);

			if ($padding) {
				scale.domain(padScale(scale, $padding));
			}

			if ($nice === true) {
				if (typeof scale.nice === 'function') {
					scale.nice();
				} else {
					console.error(`Layer Cake warning: You set \`${which}Nice: true\` but the ${which}Scale does not have a \`.nice\` method. Ignoring...`);
				}
			}

			return scale;
		};
	}

	function createGetter ([$acc, $scale]) {
		return d => {
			const val = $acc(d);
			if (Array.isArray(val)) {
				return val.map(v => $scale(v));
			}
			return $scale(val);
		};
	}

	$: if (x) {
		context.xScale = derived([_xScale, context.width, context.extents, context.xDomain, context.xPadding, context.xNice, context.reverseX], createScale('x'));
		context.xGet = derived([_x, context.xScale], createGetter);
	}

	$: if (y) {
		context.yScale = derived([_yScale, context.height, context.extents, context.yDomain, context.yPadding, context.yNice, context.reverseY], createScale('y'));
		context.yGet = derived([_y, context.yScale], createGetter);
	}

	$: if (r) {
		context.rScale = derived([_rScale, writable(25), context.extents, context.rDomain, context.rPadding, context.rNice, writable(false)], createScale('y'));
		context.rGet = derived([_r, context.rScale], createGetter);
	}

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
