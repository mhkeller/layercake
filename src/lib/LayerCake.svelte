<!--
	@component
	Layer Cake component
 -->
<script>
	import { setLayerCakeContext } from './context.js';

	import { onMount } from 'svelte';

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
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [yRange] - Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height} [yRange] - Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `yReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [zRange] - Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height} [zRange] - Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `zReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {[min: number, max: number]|Function|Array<string|number>|undefined} [rRange] - Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height} [rRange] - Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height})` that returns an array. Setting this prop overrides `rReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshhold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {boolean} [xReverse] - Reverse the default x range. By default this is `false` and the range is `[0, width]`. Ignored if you set the xRange prop.
	 * @property {boolean|undefined} [yReverse] - Reverse the default y range. By default this is set dynamically and will be `true` – setting the range to `[height, 0]` – unless the `yScale` has a `.bandwidth` method. Dynamic behavior is overridden if the user sets the prop. Ignored if you set the `yRange` prop.
	 * @property {boolean} [zReverse] - Reverse the default z range. By default this is `false` and the range is `[0, width]`. Ignored if you set the zRange prop.
	 * @property {boolean} [rReverse] - Reverse the default r range. By default this is `false` and the range is `[1, 25]`. Ignored if you set the rRange prop.
	 * @property {boolean} [xDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [yDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [zDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [rDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {{top?: Number, right?: Number, bottom?: Number, left?: Number}} [padding={}] - The amount of padding to put around your chart. It operates like CSS box-sizing: border-box; where values are subtracted from the parent container's width and height, the same as a [D3 margin convention](https://bl.ocks.org/mbostock/3019563).
	 * @property {Array<Object|Array<any>>|Object} [flatData] - A flat version of data.
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
		flatData = data,
		custom = {},
		debug = false,
		verbose = true,
		children
	} = $props();

	let yReverseValue = $derived(
		typeof yReverse === 'undefined'
			? // TODO revise types of {x,y,z,r}Scale parameters
				// @ts-ignore
				typeof yScale?.bandwidth === 'function'
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
	const config = $derived.by(() => {
		const obj = {};
		if (x) obj.x = x;
		if (y) obj.y = y;
		if (z) obj.z = z;
		if (r) obj.r = r;
		if (xDomain) obj.xDomain = xDomain;
		if (yDomain) obj.yDomain = yDomain;
		if (zDomain) obj.zDomain = zDomain;
		if (rDomain) obj.rDomain = rDomain;
		if (xRange) obj.xRange = xRange;
		if (yRange) obj.yRange = yRange;
		if (zRange) obj.zRange = zRange;
		if (rRange) obj.rRange = rRange;
		return obj;
	});

	/* --------------------------------------------
	 * Create derived values
	 * Suffix these with `_d`
	 */

	let x_d = $derived(makeAccessor(x));
	let y_d = $derived(makeAccessor(y));
	let z_d = $derived(makeAccessor(z));
	let r_d = $derived(makeAccessor(r));

	let activeGetters_d = $derived.by(() => {
		const obj = {};
		if (x) {
			obj.x = x_d;
		}
		if (y) {
			obj.y = y_d;
		}
		if (z) {
			obj.z = z_d;
		}
		if (r) {
			obj.r = r_d;
		}
		return obj;
	});

	let padding_d = $derived.by(() => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, padding);
	});

	let box_d = $derived.by(() => {
		const b = {};
		b.top = padding_d.top;
		b.right = containerWidth - padding_d.right;
		b.bottom = containerHeight - padding_d.bottom;
		b.left = padding_d.left;
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
	});

	let width_d = $derived(box_d.width);

	let height_d = $derived(box_d.height);

	/* --------------------------------------------
	 * Calculate extents by taking the extent of the data
	 * and filling that in with anything set by the user
	 * Note that this is different from an "extent" passed
	 * in as a domain, which can be a partial domain
	 */
	let extents_d = $derived.by(() => {
		const scaleLookup = {
			x: { scale: xScale, sort: xDomainSort },
			y: { scale: yScale, sort: yDomainSort },
			r: { scale: rScale, sort: rDomainSort },
			z: { scale: zScale, sort: zDomainSort }
		};

		/**
		 * Skip any extents that the user already set a min and max for
		 */
		const extents = Object.fromEntries(
			[
				['x', getCompleteDomain(xDomain)],
				['y', getCompleteDomain(yDomain)],
				['z', getCompleteDomain(zDomain)],
				['r', getCompleteDomain(rDomain)]
			].filter(([_, v]) => v !== false)
		);

		const getters = filterObject(activeGetters_d, extents);
		const activeScales = Object.fromEntries(Object.keys(getters).map(k => [k, scaleLookup[k]]));

		if (Object.keys(getters).length > 0) {
			const calculatedExtents = calcScaleExtents(flatData, getters, activeScales);
			return { ...calculatedExtents, ...extents };
		} else {
			return extents;
		}
	});

	let xDomain_d = $derived(calcDomain('x', extents_d, xDomain));
	let yDomain_d = $derived(calcDomain('y', extents_d, yDomain));
	let zDomain_d = $derived(calcDomain('z', extents_d, zDomain));
	let rDomain_d = $derived(calcDomain('r', extents_d, rDomain));

	let xScale_d = $derived(
		createScale(
			'x',
			xScale,
			extents_d,
			xDomain_d,
			xPadding,
			xNice,
			xReverse,
			width_d,
			height_d,
			xRange,
			percentRange
		)
	);

	const xGet_d = $derived(createGetter(x_d, xScale_d));

	const yScale_d = $derived(
		createScale(
			'y',
			yScale,
			extents_d,
			yDomain_d,
			yPadding,
			yNice,
			yReverseValue,
			width_d,
			height_d,
			yRange,
			percentRange
		)
	);
	const yGet_d = $derived(createGetter(y_d, yScale_d));

	const zScale_d = $derived(
		createScale(
			'z',
			zScale,
			extents_d,
			zDomain_d,
			zPadding,
			zNice,
			zReverse,
			width_d,
			height_d,
			zRange,
			percentRange
		)
	);
	const zGet_d = $derived(createGetter(z_d, zScale_d));

	const rScale_d = $derived(
		createScale(
			'r',
			rScale,
			extents_d,
			rDomain_d,
			rPadding,
			rNice,
			rReverse,
			width_d,
			height_d,
			rRange,
			percentRange
		)
	);
	const rGet_d = $derived(createGetter(r_d, rScale_d));

	// Create new _Domains in case we ran `.nice()` over our domain on scale initialization
	const xDomain_d_possibly_nice = $derived(xScale_d.domain());
	const yDomain_d_possibly_nice = $derived(yScale_d.domain());
	const zDomain_d_possibly_nice = $derived(zScale_d.domain());
	const rDomain_d_possibly_nice = $derived(rScale_d.domain());

	const xRange_d = $derived(getRange(xScale_d));
	const yRange_d = $derived(getRange(yScale_d));
	const zRange_d = $derived(getRange(zScale_d));
	const rRange_d = $derived(getRange(rScale_d));

	const aspectRatio_d = $derived(width_d / height_d);

	const context = {
		get activeGetters() {
			return activeGetters_d;
		},
		get width() {
			return width_d;
		},
		get height() {
			return height_d;
		},
		get percentRange() {
			return percentRange;
		},
		get aspectRatio() {
			return aspectRatio_d;
		},
		get containerWidth() {
			return containerWidth;
		},
		get containerHeight() {
			return containerHeight;
		},
		get x() {
			return x_d;
		},
		get y() {
			return y_d;
		},
		get z() {
			return z_d;
		},
		get r() {
			return r_d;
		},
		get custom() {
			return custom;
		},
		get data() {
			return data;
		},
		get xNice() {
			return xNice;
		},
		get yNice() {
			return yNice;
		},
		get zNice() {
			return zNice;
		},
		get rNice() {
			return rNice;
		},
		get xDomainSort() {
			return xDomainSort;
		},
		get yDomainSort() {
			return yDomainSort;
		},
		get zDomainSort() {
			return zDomainSort;
		},
		get rDomainSort() {
			return rDomainSort;
		},
		get xReverse() {
			return xReverse;
		},
		get yReverse() {
			return yReverse;
		},
		get zReverse() {
			return zReverse;
		},
		get rReverse() {
			return rReverse;
		},
		get xPadding() {
			return xPadding;
		},
		get yPadding() {
			return yPadding;
		},
		get zPadding() {
			return zPadding;
		},
		get rPadding() {
			return rPadding;
		},
		get padding() {
			return padding_d;
		},
		get flatData() {
			return flatData;
		},
		get extents() {
			return extents_d;
		},
		get xDomain() {
			return xDomain_d_possibly_nice;
		},
		get yDomain() {
			return yDomain_d_possibly_nice;
		},
		get zDomain() {
			return zDomain_d_possibly_nice;
		},
		get rDomain() {
			return rDomain_d_possibly_nice;
		},
		get xRange() {
			return xRange_d;
		},
		get yRange() {
			return yRange_d;
		},
		get zRange() {
			return zRange_d;
		},
		get rRange() {
			return rRange_d;
		},
		get config() {
			return config;
		},
		get xScale() {
			return xScale_d;
		},
		get xGet() {
			return xGet_d;
		},
		get yScale() {
			return yScale_d;
		},
		get yGet() {
			return yGet_d;
		},
		get zScale() {
			return zScale_d;
		},
		get zGet() {
			return zGet_d;
		},
		get rScale() {
			return rScale_d;
		},
		get rGet() {
			return rGet_d;
		}
	};

	setLayerCakeContext(context);

	$effect(() => {
		if (box_d && debug === true && (ssr === true || typeof window !== 'undefined')) {
			// Call this as a debounce so that it doesn't get called multiple times as these vars get filled in
			printDebug_debounced({
				data: data,
				flatData: typeof flatData !== 'undefined' ? flatData : null,
				boundingBox: box_d,
				activeGetters: activeGetters_d,
				x: config.x,
				y: config.y,
				z: config.z,
				r: config.r,
				xScale: xScale_d,
				yScale: yScale_d,
				zScale: zScale_d,
				rScale: rScale_d
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
			width: width_d,
			height: height_d,
			aspectRatio: aspectRatio_d,
			containerWidth: containerWidth,
			containerHeight: containerHeight,
			activeGetters: activeGetters_d,
			percentRange: percentRange,
			x: x,
			y: y,
			z: z,
			r: r,
			custom: custom,
			data: data,
			xNice: xNice,
			yNice: yNice,
			zNice: zNice,
			rNice: rNice,
			xDomainSort: xDomainSort,
			yDomainSort: yDomainSort,
			zDomainSort: zDomainSort,
			rDomainSort: rDomainSort,
			xReverse: xReverse,
			yReverse: yReverse,
			zReverse: zReverse,
			rReverse: rReverse,
			xPadding: xPadding,
			yPadding: yPadding,
			zPadding: zPadding,
			rPadding: rPadding,
			padding: padding_d,
			flatData: flatData,
			extents: extents_d,
			xDomain: xDomain_d,
			yDomain: yDomain_d,
			zDomain: zDomain_d,
			rDomain: rDomain_d,
			xRange: xRange_d,
			yRange: yRange_d,
			zRange: zRange_d,
			rRange: rRange_d,
			config: config,
			xScale: xScale_d,
			xGet: xGet_d,
			yScale: yScale_d,
			yGet: yGet_d,
			zScale: zScale_d,
			zGet: zGet_d,
			rScale: rScale_d,
			rGet: rGet_d
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
