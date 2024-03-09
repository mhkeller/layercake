<!--
	@component
	Layer Cake component
 -->
<script>
	import { setContext, onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';

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

	const printDebug_debounced = debounce(printDebug, 200);

	/** @type {Boolean} [ssr=false] Whether this chart should be rendered server side. */
	export let ssr = false;
	/** @type {Boolean} [pointerEvents=true] Whether to allow pointer events via CSS. Set this to `false` to set `pointer-events: none;` on all components, disabling all mouse interaction. */
	export let pointerEvents = true;
	/** @type {String} [position='relative'] Determine the positioning of the wrapper div. Set this to `'absolute'` when you want to stack cakes. */
	export let position = 'relative';
	/** @type {Boolean} [percentRange=false] If `true`, set all scale ranges to `[0, 100]`. Ranges reversed via `xReverse`, `yReverse`, `zReverse` or `rReverse` props will continue to be reversed as usual. */
	export let percentRange = false;

	/** @type {Number} [width=containerWidth] Override the automated width. */
	export let width = undefined;
	/** @type {Number} [height=containerHeight] Override the automated height. */
	export let height = undefined;

	/** @type {Number} [containerWidth=100] The bound container width. */
	export let containerWidth = width || 100;
	/** @type {Number} [containerHeight=100] The bound container height. */
	export let containerHeight = height || 100;

	/**	@type {Element} [element] The .layercake-container `<div>` tag. Useful for bindings. */
	export let element = undefined;

	/* --------------------------------------------
	 * Parameters
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 */

	/** @type {String|Function|Number|Array} x The x accessor. The key in each row of data that corresponds to the x-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context. */
	export let x = undefined;
	/** @type {String|Function|Number|Array} y The y accessor. The key in each row of data that corresponds to the y-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context. */
	export let y = undefined;
	/** @type {String|Function|Number|Array} z The z accessor. The key in each row of data that corresponds to the z-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context. */
	export let z = undefined;
	/** @type {String|Function|Number|Array} r The r accessor. The key in each row of data that corresponds to the r-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context. */
	export let r = undefined;

	/** @type {Array|Object} [data=[]] If `data` is not a flat array of objects and you want to use any of the scales, set a flat version of the data via the `flatData` prop. */
	export let data = [];

	/** @type {[min: Number|null, max: Number|null]|String[]|Number[]|Function} [xDomain] Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values. */
	export let xDomain = undefined;
	/** @type {[min: Number|null, max: Number|null]|String[]|Number[]|Function} [yDomain] Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`.  Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values. */
	export let yDomain = undefined;
	/** @type {[min: Number|null, max: Number|null]|String[]|Number[]|Function} [zDomain] Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values. */
	export let zDomain = undefined;
	/** @type {[min: Number|null, max: Number|null]|String[]|Number[]|Function} [rDomain] Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values. */
	export let rDomain = undefined;
	/** @type {Boolean|Number} [xNice=false] Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the x domain. */
	export let xNice = false;
	/** @type {Boolean|Number} [yNice=false] Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the y domain. */
	export let yNice = false;
	/** @type {Boolean|Number} [zNice=false] Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the z domain. */
	export let zNice = false;
	/** @type {Boolean} [rNice=false] Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the r domain. */
	export let rNice = false;
	/** @type {[leftPixels: Number, rightPixels: Number]} [xPadding] Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels. */
	export let xPadding = undefined;
	/** @type {[leftPixels: Number, rightPixels: Number]} [yPadding] Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels. */
	export let yPadding = undefined;
	/** @type {[leftPixels: Number, rightPixels: Number]} [zPadding] Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels. */
	export let zPadding = undefined;
	/** @type {[leftPixels: Number, rightPixels: Number]} [rPadding] Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels. */
	export let rPadding = undefined;
	/** @type {Function} [xScale=d3.scaleLinear] The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options. */
	export let xScale = defaultScales.x;
	/** @type {Function} [yScale=d3.scaleLinear] The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options. */
	export let yScale = defaultScales.y;
	/** @type {Function} [zScale=d3.scaleLinear] The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options. */
	export let zScale = defaultScales.z;
	/** @type {Function} [rScale=d3.scaleSqrt] The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want to extra options. */
	export let rScale = defaultScales.r;
	/** @type {[min: Number, max: Number]|Function|String[]|Number[]} [xRange] Override the default x range of `[0, width]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `xReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales). */
	export let xRange = undefined;
	/** @type {[min: Number, max: Number]|Function|String[]|Number[]} [xRange] Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `yReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales). */
	export let yRange = undefined;
	/** @type {[min: Number, max: Number]|Function|String[]|Number[]} [zRange] Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `zReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales). */
	export let zRange = undefined;
	/** @type {[min: Number, max: Number]|Function|String[]|Number[]} [rRange] Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `rReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales). */
	export let rRange = undefined;
	/** @type {Boolean} [xReverse=false] Reverse the default x range. By default this is `false` and the range is `[0, width]`. Ignored if you set the xRange prop. */
	export let xReverse = false;
	/** @type {Boolean} [yReverse=true] Reverse the default y range. By default this is `true` and the range is `[height, 0]` unless using an ordinal scale with a `.bandwidth` method for `yScale`. Ignored if you set the `yRange` prop. */
	export let yReverse = undefined
	/** @type {Boolean} [zReverse=false] Reverse the default z range. By default this is `false` and the range is `[0, width]`. Ignored if you set the zRange prop. */
	export let zReverse = false;
	/** @type {Boolean} [rReverse=false] Reverse the default r range. By default this is `false` and the range is `[1, 25]`. Ignored if you set the rRange prop. */
	export let rReverse = false;
	/** @type {Boolean} [xDomainSort=true] Only used when scale is ordinal. Set whether the calculated unique items come back sorted. */
	export let xDomainSort = true;
	/** @type {Boolean} [yDomainSort=true] Only used when scale is ordinal. Set whether the calculated unique items come back sorted. */
	export let yDomainSort = true
	/** @type {Boolean} [zDomainSort=true] Only used when scale is ordinal. Set whether the calculated unique items come back sorted. */
	export let zDomainSort = true;
	/** @type {Boolean} [rDomainSort=true] Only used when scale is ordinal. Set whether the calculated unique items come back sorted. */
	export let rDomainSort = true;
	/** @type {{top?: Number, right?: Number, bottom?: Number, left?: Number}} [padding={}] The amount of padding to put around your chart. It operates like CSS box-sizing: border-box; where values are subtracted from the parent container's width and height, the same as a [D3 margin convention](https://bl.ocks.org/mbostock/3019563). */
	export let padding = {};
	/** @type {{ x?: [min: Number, max: Number], y?: [min: Number, max: Number], r?: [min: Number, max: Number], z?: [min: Number, max: Number] }} [extents] Manually set the extents of the x, y or r scale as a two-dimensional array of the min and max you want. Setting values here will skip any dynamic extent calculation of the data for that dimension. */
	export let extents = {};

	/** @type {Array} [flatData=data] A flat version of data. */
	export let flatData = undefined;

	/** @type {Object} custom Any extra configuration values you want available on the LayerCake context. This could be useful for color lookups or additional constants. */
	export let custom = {};

	/** @type {Boolean} debug Enable debug printing to the console. Useful to inspect your scales and dimensions. */
	export let debug = false;

	/**
	 * Make this reactive
	 */
	$: yReverseValue = typeof yReverse === 'undefined'
		? typeof yScale.bandwidth === 'function' ? false : true
		: yReverse;

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
	const config = {};
	$: if (x) config.x = x;
	$: if (y) config.y = y;
	$: if (z) config.z = z;
	$: if (r) config.r = r;
	$: if (xDomain) config.xDomain = xDomain;
	$: if (yDomain) config.yDomain = yDomain;
	$: if (zDomain) config.zDomain = zDomain;
	$: if (rDomain) config.rDomain = rDomain;
	$: if (xRange) config.xRange = xRange;
	$: if (yRange) config.yRange = yRange;
	$: if (zRange) config.zRange = zRange;
	$: if (rRange) config.rRange = rRange;

	/* --------------------------------------------
	 * Make store versions of each parameter
	 * Prefix these with `_` to keep things organized
	 */
	const _percentRange = writable(percentRange);
	const _containerWidth = writable(containerWidth);
	const _containerHeight = writable(containerHeight);
	const _extents = writable(filterObject(extents));
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

	$: $_percentRange = percentRange;
	$: $_containerWidth = containerWidth;
	$: $_containerHeight = containerHeight;
	$: $_extents = filterObject(extents);
	$: $_data = data;
	$: $_flatData = flatData || data;
	$: $_padding = padding;
	$: $_x = makeAccessor(x);
	$: $_y = makeAccessor(y);
	$: $_z = makeAccessor(z);
	$: $_r = makeAccessor(r);
	$: $_xDomain = xDomain;
	$: $_yDomain = yDomain;
	$: $_zDomain = zDomain;
	$: $_rDomain = rDomain;
	$: $_xNice = xNice;
	$: $_yNice = yNice;
	$: $_zNice = zNice;
	$: $_rNice = rNice;
	$: $_xReverse = xReverse;
	$: $_yReverse = yReverseValue;
	$: $_zReverse = zReverse;
	$: $_rReverse = rReverse;
	$: $_xPadding = xPadding;
	$: $_yPadding = yPadding;
	$: $_zPadding = zPadding;
	$: $_rPadding = rPadding;
	$: $_xRange = xRange;
	$: $_yRange = yRange;
	$: $_zRange = zRange;
	$: $_rRange = rRange;
	$: $_xScale = xScale;
	$: $_yScale = yScale;
	$: $_zScale = zScale;
	$: $_rScale = rScale;
	$: $_custom = custom;
	$: $_config = config;

	/* --------------------------------------------
	 * Create derived values
	 * Suffix these with `_d`
	 */
	const activeGetters_d = derived([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {
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

	const padding_d = derived([_padding, _containerWidth, _containerHeight], ([$padding]) => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, $padding);
	});

	const box_d = derived(
		[_containerWidth, _containerHeight, padding_d],
		([$containerWidth, $containerHeight, $padding]) => {
			const b = {};
			b.top = $padding.top;
			b.right = $containerWidth - $padding.right;
			b.bottom = $containerHeight - $padding.bottom;
			b.left = $padding.left;
			b.width = b.right - b.left;
			b.height = b.bottom - b.top;
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
			return b;
		}
	);

	const width_d = derived([box_d], ([$box]) => {
		return $box.width;
	});

	const height_d = derived([box_d], ([$box]) => {
		return $box.height;
	});

	/* --------------------------------------------
	 * Calculate extents by taking the extent of the data
	 * and filling that in with anything set by the user
	 * Note that this is different from an "extent" passed
	 * in as a domain, which can be a partial domain
	 */
	const extents_d = derived(
		[_flatData, activeGetters_d, _extents, _xScale, _yScale, _rScale, _zScale, _xDomainSort, _yDomainSort, _zDomainSort, _rDomainSort],
		([$flatData, $activeGetters, $extents, $_xScale, $_yScale, $_rScale, $_zScale, $_xDomainSort, $_yDomainSort, $_zDomainSort, $_rDomainSort]) => {
			const scaleLookup = {
				x: { scale: $_xScale, sort: $_xDomainSort },
				y: { scale: $_yScale, sort: $_yDomainSort },
				r: { scale: $_rScale, sort: $_rDomainSort },
				z: { scale: $_zScale, sort: $_zDomainSort }
			};
			const getters = filterObject($activeGetters, $extents);
			const activeScales = Object.fromEntries(Object.keys(getters).map((k) => [k, scaleLookup[k]]));

			if (Object.keys(getters).length > 0) {
				const calculatedExtents = calcScaleExtents($flatData, getters, activeScales);
				return { ...calculatedExtents, ...$extents };
			} else {
				return {};
			}
		}
	);

	const xDomain_d = derived([extents_d, _xDomain], calcDomain('x'));
	const yDomain_d = derived([extents_d, _yDomain], calcDomain('y'));
	const zDomain_d = derived([extents_d, _zDomain], calcDomain('z'));
	const rDomain_d = derived([extents_d, _rDomain], calcDomain('r'));

	const xScale_d = derived(
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
	const xGet_d = derived([_x, xScale_d], createGetter);

	const yScale_d = derived(
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
	const yGet_d = derived([_y, yScale_d], createGetter);

	const zScale_d = derived(
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
	const zGet_d = derived([_z, zScale_d], createGetter);

	const rScale_d = derived(
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
	const rGet_d = derived([_r, rScale_d], createGetter);

	const xRange_d = derived([xScale_d], getRange);
	const yRange_d = derived([yScale_d], getRange);
	const zRange_d = derived([zScale_d], getRange);
	const rRange_d = derived([rScale_d], getRange);

	const aspectRatio_d = derived([width_d, height_d], ([$width, $height]) => {
		return $width / $height;
	});

	$: context = {
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

	$: setContext('LayerCake', context);

	$: if ($box_d && debug === true && (ssr === true || typeof window !== 'undefined')) {
		// Call this as a debounce so that it doesn't get called multiple times as these vars get filled in
		printDebug_debounced({
			data: $_data,
			boundingBox: $box_d,
			activeGetters: $activeGetters_d,
			x: config.x,
			y: config.y,
			z: config.z,
			r: config.r,
			xScale: $xScale_d,
			yScale: $yScale_d,
			zScale: $zScale_d,
			rScale: $rScale_d,
		});
	}
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
		<slot
			{element}
			width={$width_d}
			height={$height_d}
			aspectRatio={$aspectRatio_d}
			containerWidth={$_containerWidth}
			containerHeight={$_containerHeight}
			activeGetters={$activeGetters_d}
			percentRange={$_percentRange}
			x={$_x}
			y={$_y}
			z={$_z}
			r={$_r}
			custom={$_custom}
			data={$_data}
			xNice={$_xNice}
			yNice={$_yNice}
			zNice={$_zNice}
			rNice={$_rNice}
			xReverse={$_xReverse}
			yReverse={$_yReverse}
			zReverse={$_zReverse}
			rReverse={$_rReverse}
			xPadding={$_xPadding}
			yPadding={$_yPadding}
			zPadding={$_zPadding}
			rPadding={$_rPadding}
			padding={$padding_d}
			flatData={$_flatData}
			extents={$extents_d}
			xDomain={$xDomain_d}
			yDomain={$yDomain_d}
			zDomain={$zDomain_d}
			rDomain={$rDomain_d}
			xRange={$xRange_d}
			yRange={$yRange_d}
			zRange={$zRange_d}
			rRange={$rRange_d}
			config={$_config}
			xScale={$xScale_d}
			xGet={$xGet_d}
			yScale={$yScale_d}
			yGet={$yGet_d}
			zScale={$zScale_d}
			zGet={$zGet_d}
			rScale={$rScale_d}
			rGet={$rGet_d}
		/>
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
