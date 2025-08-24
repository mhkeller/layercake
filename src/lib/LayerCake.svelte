<!--
	@component
	Layer Cake component
 -->
<script>
	import { run } from 'svelte/legacy';

	import { setContext, onMount } from 'svelte';
	import { writable, derived as derivedStore } from 'svelte/store';

	import makeAccessor from './utils/makeAccessor.js';
	import filterObject from './utils/filterObject.js';
	import debounce from './utils/debounce.js';

	import calcScaleExtents from './helpers/calcScaleExtents.js';
	import calcDomain from './helpers/calcDomain.js';
	import createScale from './helpers/createScale.js';
	import createGetter from './helpers/createGetter.js';
	import getRange from './helpers/getRange.js';
	import printDebug from './helpers/printDebug.js';

	import defaultScales from './settings/defaultScales.js';
	import getCompleteDomain from './utils/getCompleteDomain.js';

	const printDebug_debounced = debounce(printDebug, 200);

	/* --------------------------------------------
	 * Parameters
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 */

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [ssr] - Whether this chart should be rendered server side.
	 * @property {boolean} [pointerEvents] - Whether to allow pointer events via CSS. Set this to `false` to set `pointer-events: none;` on all components, disabling all mouse interaction.
	 * @property {string} [position] - Determine the positioning of the wrapper div. Set this to `'absolute'` when you want to stack cakes.
	 * @property {boolean} [percentRange] - If `true`, set all scale ranges to `[0, 100]`. Ranges reversed via `xReverse`, `yReverse`, `zReverse` or `rReverse` props will continue to be reversed as usual.
	 * @property {number} [width] - Override the automated width.
	 * @property {number} [height] - Override the automated height.
	 * @property {number} [containerWidth] - The bound container width.
	 * @property {number} [containerHeight] - The bound container height.
	 * @property {Element|undefined} [element] - The .layercake-container `<div>` tag. Useful for bindings.
	 * @property {string|Function|number|Array<string|Function|number>|undefined} [x] - The x accessor. The key in each row of data that corresponds to the x-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {string|Function|number|Array<string|Function|number>|undefined} [y] - The y accessor. The key in each row of data that corresponds to the y-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {string|Function|number|Array<string|Function|number>|undefined} [z] - The z accessor. The key in each row of data that corresponds to the z-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {string|Function|number|Array<string|Function|number>|undefined} [r] - The r accessor. The key in each row of data that corresponds to the r-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {Array<Object>|Object} [data]
	 * @property {[min: number|null, max: number|null]|Array<string|number>|Function|undefined} [xDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {[min: number|null, max: number|null]|Array<string|number>|Function|undefined} [yDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`.  Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {[min: number|null, max: number|null]|Array<string|number>|Function|undefined} [zDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {[min: number|null, max: number|null]|Array<string|number>|Function|undefined} [rDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {boolean|number} [xNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the x domain.
	 * @property {boolean|number} [yNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the y domain.
	 * @property {boolean|number} [zNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the z domain.
	 * @property {boolean} [rNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the r domain.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [xPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [yPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [zPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [rPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {Function} [xScale] - The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options.
	 * @property {Function} [yScale] - The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options.
	 * @property {Function} [zScale] - The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options.
	 * @property {Function} [rScale] - The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options.
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [xRange] - Override the default x range of `[0, width]` by setting an array or function with argument `({ width, height} [xRange] - Override the default x range of `[0, width]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `xReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [xRange] - Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height} [yRange] - Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `yReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [yRange] - Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height} [zRange] - Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `zReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [rRange] - Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height} [rRange] - Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `rReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {boolean} [xReverse] - Reverse the default x range. By default this is `false` and the range is `[0, width]`. Ignored if you set the xRange prop.
	 * @property {boolean|undefined} [yReverse] - Reverse the default y range. By default this is set dynamically and will be `true` – setting the range to `[height, 0]` – unless the `yScale` has a `.bandwidth` method. Dynamic behavior is overridden if the user sets the prop. Ignored if you set the `yRange` prop.
	 * @property {boolean} [zReverse] - Reverse the default z range. By default this is `false` and the range is `[0, width]`. Ignored if you set the zRange prop.
	 * @property {boolean} [rReverse] - Reverse the default r range. By default this is `false` and the range is `[1, 25]`. Ignored if you set the rRange prop.
	 * @property {boolean} [xDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [yDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [zDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [rDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {{top?: Number, right?: Number, bottom?: Number, left?: Number}} [padding={} [padding] - The amount of padding to put around your chart. It operates like CSS box-sizing: border-box; where values are subtracted from the parent container's width and height, the same as a [D3 margin convention](https://bl.ocks.org/mbostock/3019563).
	 * @property {Array<Object|Array<any>>|undefined} [flatData] - A flat version of data.
	 * @property {Object} [custom] - Any extra configuration values you want available on the LayerCake context. This could be useful for color lookups or additional constants.
	 * @property {boolean} [debug] - Enable debug printing to the console. Useful to inspect your scales and dimensions.
	 * @property {boolean} [verbose] - Show warnings in the console.
	 * @property {import('svelte').Snippet<[any]>} [children]
	 */

	/** @type {Props} */
	let {
		ssr = false,
		pointerEvents = true,
		position = 'relative',
		percentRange = false,
		width = undefined,
		height = undefined,
		containerWidth = $bindable(width || 100),
		containerHeight = $bindable(height || 100),
		element = $bindable(undefined),
		x = undefined,
		y = undefined,
		z = undefined,
		r = undefined,
		data = [],
		xDomain = undefined,
		yDomain = undefined,
		zDomain = undefined,
		rDomain = undefined,
		xNice = false,
		yNice = false,
		zNice = false,
		rNice = false,
		xPadding = undefined,
		yPadding = undefined,
		zPadding = undefined,
		rPadding = undefined,
		xScale = defaultScales.x,
		yScale = defaultScales.y,
		zScale = defaultScales.z,
		rScale = defaultScales.r,
		xRange = undefined,
		yRange = undefined,
		zRange = undefined,
		rRange = undefined,
		xReverse = false,
		yReverse = undefined,
		zReverse = false,
		rReverse = false,
		xDomainSort = false,
		yDomainSort = false,
		zDomainSort = false,
		rDomainSort = false,
		padding = {},
		flatData = undefined,
		custom = {},
		debug = false,
		verbose = true,
		children
	} = $props();

	/**
	 * Make this reactive
	 */
	let yReverseValue = $derived(
		typeof yReverse === 'undefined'
			? typeof yScale.bandwidth === 'function'
				? false
				: true
			: yReverse
	);

	/* --------------------------------------------
	 * Keep track of whether the component has mounted
	 * This is used to emit warnings once we have measured
	 * the container object and it doesn't have proper dimensions
	 */
	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	/* --------------------------------------------
	 * Preserve a copy of our passed in settings before we modify them
	 * Return this to the user's context so they can reference things if need be
	 * Add the active keys since those aren't on our settings object.
	 * This is mostly an escape-hatch
	 */
	const config = $state({});
	run(() => {
		if (x) config.x = x;
	});
	run(() => {
		if (y) config.y = y;
	});
	run(() => {
		if (z) config.z = z;
	});
	run(() => {
		if (r) config.r = r;
	});
	run(() => {
		if (xDomain) config.xDomain = xDomain;
	});
	run(() => {
		if (yDomain) config.yDomain = yDomain;
	});
	run(() => {
		if (zDomain) config.zDomain = zDomain;
	});
	run(() => {
		if (rDomain) config.rDomain = rDomain;
	});
	run(() => {
		if (xRange) config.xRange = xRange;
	});
	run(() => {
		if (yRange) config.yRange = yRange;
	});
	run(() => {
		if (zRange) config.zRange = zRange;
	});
	run(() => {
		if (rRange) config.rRange = rRange;
	});

	/* --------------------------------------------
	 * Make store versions of each parameter
	 * Prefix these with `_` to keep things organized
	 */
	const _percentRange = writable(percentRange);
	const _containerWidth = writable(containerWidth);
	const _containerHeight = writable(containerHeight);
	const _data = writable(data);
	const _flatData = writable(flatData || data);
	const _padding = writable(padding);
	const _x = writable(makeAccessor(x));
	const _y = writable(makeAccessor(y));
	const _z = writable(makeAccessor(z));
	const _r = writable(makeAccessor(r));
	const _xDomain = writable(xDomain);
	const _yDomain = writable(yDomain);
	const _zDomain = writable(zDomain);
	const _rDomain = writable(rDomain);
	const _xNice = writable(xNice);
	const _yNice = writable(yNice);
	const _zNice = writable(zNice);
	const _rNice = writable(rNice);
	const _xReverse = writable(xReverse);
	const _yReverse = writable(yReverseValue);
	const _zReverse = writable(zReverse);
	const _rReverse = writable(rReverse);
	const _xPadding = writable(xPadding);
	const _yPadding = writable(yPadding);
	const _zPadding = writable(zPadding);
	const _rPadding = writable(rPadding);
	const _xRange = writable(xRange);
	const _yRange = writable(yRange);
	const _zRange = writable(zRange);
	const _rRange = writable(rRange);
	const _xScale = writable(xScale);
	const _yScale = writable(yScale);
	const _zScale = writable(zScale);
	const _rScale = writable(rScale);
	const _xDomainSort = writable(xDomainSort);
	const _yDomainSort = writable(yDomainSort);
	const _zDomainSort = writable(zDomainSort);
	const _rDomainSort = writable(rDomainSort);
	const _config = writable(config);
	const _custom = writable(custom);

	run(() => {
		$_percentRange = percentRange;
	});
	run(() => {
		$_containerWidth = containerWidth;
	});
	run(() => {
		$_containerHeight = containerHeight;
	});
	run(() => {
		$_data = data;
	});
	run(() => {
		$_flatData = flatData || data;
	});
	run(() => {
		$_padding = padding;
	});
	run(() => {
		$_x = makeAccessor(x);
	});
	run(() => {
		$_y = makeAccessor(y);
	});
	run(() => {
		$_z = makeAccessor(z);
	});
	run(() => {
		$_r = makeAccessor(r);
	});
	run(() => {
		$_xDomain = xDomain;
	});
	run(() => {
		$_yDomain = yDomain;
	});
	run(() => {
		$_zDomain = zDomain;
	});
	run(() => {
		$_rDomain = rDomain;
	});
	run(() => {
		$_xNice = xNice;
	});
	run(() => {
		$_yNice = yNice;
	});
	run(() => {
		$_zNice = zNice;
	});
	run(() => {
		$_rNice = rNice;
	});
	run(() => {
		$_xReverse = xReverse;
	});
	run(() => {
		$_yReverse = yReverseValue;
	});
	run(() => {
		$_zReverse = zReverse;
	});
	run(() => {
		$_rReverse = rReverse;
	});
	run(() => {
		$_xPadding = xPadding;
	});
	run(() => {
		$_yPadding = yPadding;
	});
	run(() => {
		$_zPadding = zPadding;
	});
	run(() => {
		$_rPadding = rPadding;
	});
	run(() => {
		$_xRange = xRange;
	});
	run(() => {
		$_yRange = yRange;
	});
	run(() => {
		$_zRange = zRange;
	});
	run(() => {
		$_rRange = rRange;
	});
	run(() => {
		$_xScale = xScale;
	});
	run(() => {
		$_yScale = yScale;
	});
	run(() => {
		$_zScale = zScale;
	});
	run(() => {
		$_rScale = rScale;
	});
	run(() => {
		$_custom = custom;
	});
	run(() => {
		$_config = config;
	});

	/* --------------------------------------------
	 * Create derived values
	 * Suffix these with `_d`
	 */
	const activeGetters_d = derivedStore([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {
		const obj = {};
		if ($x) {
			obj.x = $x;
		}
		if ($y) {
			obj.y = $y;
		}
		if ($z) {
			obj.z = $z;
		}
		if ($r) {
			obj.r = $r;
		}
		return obj;
	});

	const padding_d = derivedStore([_padding, _containerWidth, _containerHeight], ([$padding]) => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, $padding);
	});

	const box_d = derivedStore(
		[_containerWidth, _containerHeight, padding_d],
		([$containerWidth, $containerHeight, $padding]) => {
			const b = {};
			b.top = $padding.top;
			b.right = $containerWidth - $padding.right;
			b.bottom = $containerHeight - $padding.bottom;
			b.left = $padding.left;
			b.width = b.right - b.left;
			b.height = b.bottom - b.top;
			if (verbose === true) {
				if (b.width <= 0 && isMounted === true) {
					console.warn(
						'[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?'
					);
				}
				if (b.height <= 0 && isMounted === true) {
					console.warn(
						'[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?'
					);
				}
			}
			return b;
		}
	);

	const width_d = derivedStore([box_d], ([$box]) => {
		return $box.width;
	});

	const height_d = derivedStore([box_d], ([$box]) => {
		return $box.height;
	});

	/* --------------------------------------------
	 * Calculate extents by taking the extent of the data
	 * and filling that in with anything set by the user
	 * Note that this is different from an "extent" passed
	 * in as a domain, which can be a partial domain
	 */
	const extents_d = derivedStore(
		[
			_flatData,
			activeGetters_d,
			_xScale,
			_yScale,
			_rScale,
			_zScale,
			_xDomain,
			_yDomain,
			_zDomain,
			_rDomain,
			_xDomainSort,
			_yDomainSort,
			_zDomainSort,
			_rDomainSort
		],
		([
			$flatData,
			$activeGetters,
			$_xScale,
			$_yScale,
			$_rScale,
			$_zScale,
			$xDomain,
			$yDomain,
			$zDomain,
			$rDomain,
			$_xDomainSort,
			$_yDomainSort,
			$_zDomainSort,
			$_rDomainSort
		]) => {
			const scaleLookup = {
				x: { scale: $_xScale, sort: $_xDomainSort },
				y: { scale: $_yScale, sort: $_yDomainSort },
				r: { scale: $_rScale, sort: $_rDomainSort },
				z: { scale: $_zScale, sort: $_zDomainSort }
			};

			/**
			 * Skip any extents that the user already set a min and max for
			 */
			const extents = Object.fromEntries(
				[
					['x', getCompleteDomain($xDomain)],
					['y', getCompleteDomain($yDomain)],
					['z', getCompleteDomain($zDomain)],
					['r', getCompleteDomain($rDomain)]
				].filter(([_, v]) => v !== false)
			);

			const getters = filterObject($activeGetters, extents);
			const activeScales = Object.fromEntries(Object.keys(getters).map(k => [k, scaleLookup[k]]));

			if (Object.keys(getters).length > 0) {
				const calculatedExtents = calcScaleExtents($flatData, getters, activeScales);
				return { ...calculatedExtents, ...extents };
			} else {
				return extents;
			}
		}
	);

	const xDomain_d = derivedStore([extents_d, _xDomain], calcDomain('x'));
	const yDomain_d = derivedStore([extents_d, _yDomain], calcDomain('y'));
	const zDomain_d = derivedStore([extents_d, _zDomain], calcDomain('z'));
	const rDomain_d = derivedStore([extents_d, _rDomain], calcDomain('r'));

	const xScale_d = derivedStore(
		[
			_xScale,
			extents_d,
			xDomain_d,
			_xPadding,
			_xNice,
			_xReverse,
			width_d,
			height_d,
			_xRange,
			_percentRange
		],
		createScale('x')
	);
	const xGet_d = derivedStore([_x, xScale_d], createGetter);

	const yScale_d = derivedStore(
		[
			_yScale,
			extents_d,
			yDomain_d,
			_yPadding,
			_yNice,
			_yReverse,
			width_d,
			height_d,
			_yRange,
			_percentRange
		],
		createScale('y')
	);
	const yGet_d = derivedStore([_y, yScale_d], createGetter);

	const zScale_d = derivedStore(
		[
			_zScale,
			extents_d,
			zDomain_d,
			_zPadding,
			_zNice,
			_zReverse,
			width_d,
			height_d,
			_zRange,
			_percentRange
		],
		createScale('z')
	);
	const zGet_d = derivedStore([_z, zScale_d], createGetter);

	const rScale_d = derivedStore(
		[
			_rScale,
			extents_d,
			rDomain_d,
			_rPadding,
			_rNice,
			_rReverse,
			width_d,
			height_d,
			_rRange,
			_percentRange
		],
		createScale('r')
	);
	const rGet_d = derivedStore([_r, rScale_d], createGetter);

	// Create new _Domains in case we ran `.nice()` over our domain on scale initialization
	const xDomain_d_possibly_nice = derivedStore(xScale_d, $xScale_d => $xScale_d.domain());
	const yDomain_d_possibly_nice = derivedStore(yScale_d, $yScale_d => $yScale_d.domain());
	const zDomain_d_possibly_nice = derivedStore(zScale_d, $zScale_d => $zScale_d.domain());
	const rDomain_d_possibly_nice = derivedStore(rScale_d, $rScale_d => $rScale_d.domain());

	const xRange_d = derivedStore([xScale_d], getRange);
	const yRange_d = derivedStore([yScale_d], getRange);
	const zRange_d = derivedStore([zScale_d], getRange);
	const rRange_d = derivedStore([rScale_d], getRange);

	const aspectRatio_d = derivedStore([width_d, height_d], ([$width, $height]) => {
		return $width / $height;
	});

	const context = {
		activeGetters: activeGetters_d,
		width: width_d,
		height: height_d,
		percentRange: _percentRange,
		aspectRatio: aspectRatio_d,
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
		xDomainSort: _xDomainSort,
		yDomainSort: _yDomainSort,
		zDomainSort: _zDomainSort,
		rDomainSort: _rDomainSort,
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
		xDomain: xDomain_d_possibly_nice,
		yDomain: yDomain_d_possibly_nice,
		zDomain: zDomain_d_possibly_nice,
		rDomain: rDomain_d_possibly_nice,
		xRange: xRange_d,
		yRange: yRange_d,
		zRange: zRange_d,
		rRange: rRange_d,
		config: _config,
		xScale: xScale_d,
		xGet: xGet_d,
		yScale: yScale_d,
		yGet: yGet_d,
		zScale: zScale_d,
		zGet: zGet_d,
		rScale: rScale_d,
		rGet: rGet_d
	};

	setContext('LayerCake', context);

	run(() => {
		if ($box_d && debug === true && (ssr === true || typeof window !== 'undefined')) {
			// Call this as a debounce so that it doesn't get called multiple times as these vars get filled in
			printDebug_debounced({
				data: $_data,
				flatData: typeof flatData !== 'undefined' ? $_flatData : null,
				boundingBox: $box_d,
				activeGetters: $activeGetters_d,
				x: config.x,
				y: config.y,
				z: config.z,
				r: config.r,
				xScale: $xScale_d,
				yScale: $yScale_d,
				zScale: $zScale_d,
				rScale: $rScale_d
			});
		}
	});
</script>

{#if ssr === true || typeof window !== 'undefined'}
	<div
		bind:this={element}
		class="layercake-container"
		style:position
		style:top={position === 'absolute' ? '0' : null}
		style:right={position === 'absolute' ? '0' : null}
		style:bottom={position === 'absolute' ? '0' : null}
		style:left={position === 'absolute' ? '0' : null}
		style:pointer-events={pointerEvents === false ? 'none' : null}
		bind:clientWidth={containerWidth}
		bind:clientHeight={containerHeight}
	>
		{@render children?.({
			element,
			width: $width_d,
			height: $height_d,
			aspectRatio: $aspectRatio_d,
			containerWidth: $_containerWidth,
			containerHeight: $_containerHeight,
			activeGetters: $activeGetters_d,
			percentRange: $_percentRange,
			x: $_x,
			y: $_y,
			z: $_z,
			r: $_r,
			custom: $_custom,
			data: $_data,
			xNice: $_xNice,
			yNice: $_yNice,
			zNice: $_zNice,
			rNice: $_rNice,
			xDomainSort: $_xDomainSort,
			yDomainSort: $_yDomainSort,
			zDomainSort: $_zDomainSort,
			rDomainSort: $_rDomainSort,
			xReverse: $_xReverse,
			yReverse: $_yReverse,
			zReverse: $_zReverse,
			rReverse: $_rReverse,
			xPadding: $_xPadding,
			yPadding: $_yPadding,
			zPadding: $_zPadding,
			rPadding: $_rPadding,
			padding: $padding_d,
			flatData: $_flatData,
			extents: $extents_d,
			xDomain: $xDomain_d,
			yDomain: $yDomain_d,
			zDomain: $zDomain_d,
			rDomain: $rDomain_d,
			xRange: $xRange_d,
			yRange: $yRange_d,
			zRange: $zRange_d,
			rRange: $rRange_d,
			config: $_config,
			xScale: $xScale_d,
			xGet: $xGet_d,
			yScale: $yScale_d,
			yGet: $yGet_d,
			zScale: $zScale_d,
			zGet: $zGet_d,
			rScale: $rScale_d,
			rGet: $rGet_d
		})}
	</div>
{/if}

<style>
	.layercake-container,
	.layercake-container :global(*) {
		box-sizing: border-box;
	}
	.layercake-container {
		width: 100%;
		height: 100%;
	}
</style>
