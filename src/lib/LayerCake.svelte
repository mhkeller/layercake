<!--
	@component
	Layer Cake component
 -->
<script>
	import { setLayerCakeContext } from './context.js';
	import createDimension from './state/dimension.svelte.js';
	import {
		DIMENSIONS,
		DIMENSION_KEY_FAMILIES,
		FAMILIES_BY_DIMENSION,
		VALID_DIMENSION_PROPS,
		familyStateKey
	} from './settings/dimensions.js';

	import filterObject from './utils/filterObject.js';
	import debounce from './utils/debounce.js';
	import isCompleteDomain from './utils/isCompleteDomain.js';

	import calcScaleExtents from './helpers/calcScaleExtents.js';
	import printDebug from './helpers/printDebug.js';

	const printDebug_debounced = debounce(printDebug, 200);

	/**
	 * The shapes the dimension props share, pulled in by name so the typedef
	 * below can say `DataAccessor` instead of repeating its union eight times.
	 * See types.js for what each one accepts.
	 * @typedef {import('./types.js').DataAccessor} DataAccessor
	 * @typedef {import('./types.js').DimensionDomain} DimensionDomain
	 * @typedef {import('./types.js').DimensionRange} DimensionRange
	 */

	/**
	 * The LayerCake props: the static props plus every per-dimension prop
	 * family (x, xScale, cRange etc.). Every `@property` line from `[x]` down
	 * to the end of this comment is generated – edit the registry, then run
	 * `pnpm generate:dims`. No fence markers by design; see
	 * src/scripts/generateDimensionDocs.js.
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
	 * @property {Array<Object>|Object} [data]
	 * @property {{top?: Number, right?: Number, bottom?: Number, left?: Number}} [padding] - The amount of padding to put around your chart. It operates like CSS box-sizing: border-box; where values are subtracted from the parent container's width and height, the same as a [D3 margin convention](https://bl.ocks.org/mbostock/3019563).
	 * @property {Array<Object|Array<any>>|undefined} [flatData] - A flat version of data.
	 * @property {Object} [custom] - Any extra configuration values you want available on the LayerCake context. This could be useful for color lookups or additional constants.
	 * @property {boolean} [debug] - Enable debug printing to the console. Useful to inspect your scales and dimensions.
	 * @property {boolean} [verbose] - Show warnings in the console.
	 * @property {import('svelte').Snippet<[any]>} [children]
	 * @property {DataAccessor} [x] - The x accessor. The key in each row of data that corresponds to the x-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {DataAccessor} [y] - The y accessor. The key in each row of data that corresponds to the y-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {DataAccessor} [z] - The z accessor. The key in each row of data that corresponds to the z-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {DataAccessor} [r] - The r accessor. The key in each row of data that corresponds to the r-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.
	 * @property {DataAccessor} [x1] - The x1 accessor, for a scale nested inside the x scale, such as in grouped column charts. By default its range is the bandwidth of the x scale.
	 * @property {DataAccessor} [y1] - The y1 accessor, for a scale nested inside the y scale, such as in grouped bar charts. By default its range is the bandwidth of the y scale.
	 * @property {DataAccessor} [c] - The c accessor, a dedicated color dimension. Its domain is computed from the data like any other dimension and its range defaults to a ten-color categorical palette – supply your own colors via `cRange`.
	 * @property {DataAccessor} [c1] - The c1 accessor, a second color-like dimension, useful for encoding opacity alongside color. Defaults to a linear scale mapping the data extent to `[0, 1]`.
	 * @property {DimensionDomain} [xDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {DimensionDomain} [yDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {DimensionDomain} [zDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {DimensionDomain} [rDomain] - Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values.
	 * @property {DimensionDomain} [x1Domain] - Set the domain of the x1 scale. Computed from the data by default, like any other dimension.
	 * @property {DimensionDomain} [y1Domain] - Set the domain of the y1 scale. Computed from the data by default, like any other dimension.
	 * @property {DimensionDomain} [cDomain] - Set the domain of the c scale. Computed from the data by default, like any other dimension.
	 * @property {DimensionDomain} [c1Domain] - Set the domain of the c1 scale. Computed from the data by default, like any other dimension.
	 * @property {boolean|number} [xNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the x domain.
	 * @property {boolean|number} [yNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the y domain.
	 * @property {boolean|number} [zNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the z domain.
	 * @property {boolean} [rNice] - Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the r domain.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [xPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [yPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [zPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {[leftPixels: number, rightPixels: number]|undefined} [rPadding] - Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.
	 * @property {Function} [xScale] - The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default or you want extra options. A range you customized on the scale you pass in is preserved – set `xRange` to override it.
	 * @property {Function} [yScale] - The D3 scale that should be used for the y-dimension. Pass in an instantiated D3 scale if you want to override the default or you want extra options. A range you customized on the scale you pass in is preserved – set `yRange` to override it.
	 * @property {Function} [zScale] - The D3 scale that should be used for the z-dimension. Pass in an instantiated D3 scale if you want to override the default or you want extra options. A range you customized on the scale you pass in is preserved – set `zRange` to override it.
	 * @property {Function} [rScale] - The D3 scale that should be used for the r-dimension. Pass in an instantiated D3 scale if you want to override the default or you want extra options. A range you customized on the scale you pass in is preserved – set `rRange` to override it.
	 * @property {Function} [x1Scale] - The D3 scale that should be used for the x1-dimension. Defaults to a `scaleBand()`. A range you customized on the scale you pass in is preserved – set `x1Range` to override it.
	 * @property {Function} [y1Scale] - The D3 scale that should be used for the y1-dimension. Defaults to a `scaleBand()`. A range you customized on the scale you pass in is preserved – set `y1Range` to override it.
	 * @property {Function} [cScale] - The D3 scale that should be used for the c-dimension. Defaults to a `scaleOrdinal()`. A range you customized on the scale you pass in is preserved – set `cRange` to override it.
	 * @property {Function} [c1Scale] - The D3 scale that should be used for the c1-dimension. Defaults to a `scaleLinear()`. A range you customized on the scale you pass in is preserved – set `c1Range` to override it.
	 * @property {DimensionRange} [xRange] - Override the default x range of `[0, width]` by setting an array or function with argument `({ width, height, scales })` that returns an array. Setting this prop overrides `xReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {DimensionRange} [yRange] - Override the default y range of `[0, height]` by setting an array or function with argument `({ width, height, scales })` that returns an array. Setting this prop overrides `yReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {DimensionRange} [zRange] - Override the default z range of `[0, width]` by setting an array or function with argument `({ width, height, scales })` that returns an array. Setting this prop overrides `zReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {DimensionRange} [rRange] - Override the default r range of `[1, 25]` by setting an array or function with argument `({ width, height, scales })` that returns an array. Setting this prop overrides `rReverse`. This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).
	 * @property {DimensionRange} [x1Range] - Override the default x1 range, which is the bandwidth of the x scale. Functions receive `({ width, height, scales })` where `scales` holds the computed sibling scales, e.g. `x1Range={({ scales }) => [0, scales.x.bandwidth() / 2]}`.
	 * @property {DimensionRange} [y1Range] - Override the default y1 range, which is the bandwidth of the y scale. Functions receive `({ width, height, scales })` where `scales` holds the computed sibling scales, e.g. `y1Range={({ scales }) => [0, scales.y.bandwidth() / 2]}`.
	 * @property {DimensionRange} [cRange] - The colors of the c scale, as an array or a function with argument `({ width, height, scales })`. Defaults to a ten-color categorical palette (d3's `schemeCategory10`), recycled past ten categories.
	 * @property {DimensionRange} [c1Range] - The range of the c1 scale, such as a list of opacity values. Defaults to `[0, 1]`.
	 * @property {boolean} [xReverse] - Reverse the default x range. By default this is `false` and the range is `[0, width]`. Ignored if you set the `xRange` prop.
	 * @property {boolean|undefined} [yReverse] - Reverse the default y range. By default this is set dynamically and will be `true` – setting the range to `[height, 0]` – unless the `yScale` has a `.bandwidth` method. Dynamic behavior is overridden if the user sets the prop. Ignored if you set the `yRange` prop.
	 * @property {boolean} [zReverse] - Reverse the default z range. By default this is `false` and the range is `[0, width]`. Ignored if you set the `zRange` prop.
	 * @property {boolean} [rReverse] - Reverse the default r range. By default this is `false` and the range is `[1, 25]`. Ignored if you set the `rRange` prop.
	 * @property {boolean} [xDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [yDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [zDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [rDomainSort] - Only used when scale is ordinal. Set whether the calculated unique items come back sorted.
	 * @property {boolean} [x1DomainSort] - Set whether the x1 scale's calculated unique items come back sorted.
	 * @property {boolean} [y1DomainSort] - Set whether the y1 scale's calculated unique items come back sorted.
	 * @property {boolean} [cDomainSort] - Set whether the c scale's calculated unique items come back sorted.
	 * @property {boolean} [c1DomainSort] - Set whether the c1 scale's calculated unique items come back sorted.
	 */

	/** @type {Props & Object.<string, any>} */
	let {
		ssr = false,
		pointerEvents = true,
		position = 'relative',
		percentRange = false,
		width: widthProp = undefined,
		height: heightProp = undefined,
		containerWidth = $bindable(widthProp || 100),
		containerHeight = $bindable(heightProp || 100),
		element = $bindable(undefined),
		data = [],
		padding: paddingProp = {},
		flatData: flatDataProp = undefined,
		custom = {},
		debug = false,
		verbose = true,
		children,
		// Everything else is a dimension prop – x, xScale, cRange and so on. Fifty-odd
		// of them, so we look them up by name. Svelte tracks rest props per property,
		// so that still updates when one changes.
		...dimProps
	} = $props();

	// Warn on unrecognized dimension props so typos don't get silently ignored
	const warnedProps = new Set();
	$effect(() => {
		if (verbose !== true) return;
		for (const key of Object.keys(dimProps)) {
			// Skip internal keys such as `$$slots`, added for legacy-mode consumers
			if (key.startsWith('$$')) continue;
			if (!VALID_DIMENSION_PROPS.has(key) && !warnedProps.has(key)) {
				warnedProps.add(key);
				console.warn(`[LayerCake] Unknown prop '${key}'. Ignoring...`);
			}
		}
	});

	// What the user literally passed us. The context reports finished values –
	// `c.xDomain` is post-`.nice()`, with any nulls filled in from the data – so
	// this is where you look for the original request.
	const config = $derived.by(() => {
		/** @type {Object.<string, any>} */
		const obj = {};
		for (const dimension of DIMENSIONS) {
			for (const family of DIMENSION_KEY_FAMILIES) {
				if (family.addToConfig !== true) continue;
				const key = `${dimension.name}${family.suffix}`;
				if (dimProps[key] !== undefined) obj[key] = dimProps[key];
			}
		}
		return Object.freeze(obj);
	});

	const flatData = $derived(flatDataProp || data);

	const padding = $derived({ top: 0, right: 0, bottom: 0, left: 0, ...paddingProp });

	const width = $derived(containerWidth - padding.left - padding.right);
	const height = $derived(containerHeight - padding.top - padding.bottom);

	// An effect, not a derived, because a derived only runs when something reads
	// it. A chart whose children never touch `width` or `height` would skip the
	// warning – and that's the broken chart we most want to catch.
	$effect(() => {
		if (verbose === true) {
			if (width <= 0) {
				console.warn(
					'[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?'
				);
			}
			if (height <= 0) {
				console.warn(
					'[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?'
				);
			}
		}
	});

	// Create one reactive key for each possible dimension.
	//
	// `dims` is populated further down, after `extents` exists, but we create it
	// here because `extents` reads it. Keep that order – moving `extents` below
	// `dimensionCtx` breaks SSR via a Svelte codegen bug.
	/** @type {Object.<string, ReturnType<typeof createDimension>>} */
	const dims = {};
	/** @type {Object.<string, Function|undefined>} */
	const scales = {};
	for (const dimension of DIMENSIONS) {
		Object.defineProperty(scales, dimension.name, {
			get: () => dims[dimension.name].scale,
			enumerable: true
		});
	}

	// `dims` is still empty on the line above. Fine – a `$derived.by` body doesn't
	// run where it's written, it runs when something reads it, and by then the
	// loop below has filled `dims` in.
	const activeGetters = $derived.by(() => {
		/** @type {Object.<string, Function>} */
		const obj = {};
		for (const dimension of DIMENSIONS) {
			const accessor = dims[dimension.name].accessor;
			if (accessor) {
				obj[dimension.name] = accessor;
			}
		}
		return obj;
	});

	// Calculate extents by taking the [min, max] of the data
	// and filling that in with anything set by the user
	// Note that this is different from an "extent" passed
	// in as a domain prop, which can be a partial domain (has nulls or is a function)
	const extents = $derived.by(() => {
		/** @type {Object.<string, Array<any>>} */
		const presetExtents = {};
		for (const dimension of DIMENSIONS) {
			// Skip any extents that the user already set a min and max for
			const domainProp = dimProps[`${dimension.name}Domain`];
			if (isCompleteDomain(domainProp)) {
				presetExtents[dimension.name] = domainProp;
			}
		}

		const gettersToMeasure = filterObject(activeGetters, presetExtents);
		const names = Object.keys(gettersToMeasure);

		if (names.length > 0) {
			// Only read this info for the dimensions we're measuring. Reading a
			// value inside a derived subscribes to it, so touching an unused
			// dimension's props here would make changing them – say a `cScale` we
			// never measure – re-run this whole calculation.
			const dimensionInfo = Object.fromEntries(
				names.map(k => [k, { isOrdinal: dims[k].isOrdinal, sort: dims[k].domainSort }])
			);
			// Only rows have to be indexable – they can be objects or arrays – but
			// we can't measure anything unless the collection itself is a list
			if (!Array.isArray(flatData)) {
				throw new TypeError(
					`[LayerCake] Can't measure the extents of your data because ${flatDataProp === undefined ? '`data` is not an array' : '`flatData` is not an array'}. Pass a flat array of rows to the \`flatData\` prop. More info: https://layercake.graphics/guide/#flatdata`
				);
			}
			const calculatedExtents = calcScaleExtents(flatData, gettersToMeasure, dimensionInfo);
			return { ...calculatedExtents, ...presetExtents };
		}
		return presetExtents;
	});

	const dimensionCtx = {
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get percentRange() {
			return percentRange;
		},
		get extents() {
			return extents;
		},
		scales
	};

	// Actually create the reactive dimensions object.
	for (const dimension of DIMENSIONS) {
		dims[dimension.name] = createDimension(dimension, () => dimProps, dimensionCtx);
	}

	// Assemble the context. Every property is a getter into reactive state
	// so child components read live values as `c.width`, `c.xGet(d)` etc.
	const context = {};
	Object.defineProperties(context, {
		activeGetters: { get: () => activeGetters, enumerable: true },
		width: { get: () => width, enumerable: true },
		height: { get: () => height, enumerable: true },
		percentRange: { get: () => percentRange, enumerable: true },
		aspectRatio: { get: () => width / height, enumerable: true },
		containerWidth: { get: () => containerWidth, enumerable: true },
		containerHeight: { get: () => containerHeight, enumerable: true },
		element: { get: () => element, enumerable: true },
		custom: { get: () => custom, enumerable: true },
		data: { get: () => data, enumerable: true },
		padding: { get: () => padding, enumerable: true },
		flatData: { get: () => flatData, enumerable: true },
		extents: { get: () => extents, enumerable: true },
		config: { get: () => config, enumerable: true }
	});

	// Every dimension gets keys, even unused ones. This loop runs once at setup
	// with no second pass. For example, if we didn't add an unpassed prop `c` here,
	// that would mean `cGet` never exists – even if the user starts passing `c` later.
	// Unused ones return `undefined`.
	for (const dimension of DIMENSIONS) {
		const name = dimension.name;
		// `dims` is populated by now, so we can hold the object directly rather than
		// looking it up inside each getter the way `scales` up top has to.
		const dim = /** @type {Object.<string, any>} */ (dims[name]);
		/** @type {PropertyDescriptorMap} */
		const descriptors = {};
		for (const family of FAMILIES_BY_DIMENSION[name]) {
			const stateKey = familyStateKey(family);
			descriptors[`${name}${family.suffix}`] = { get: () => dim[stateKey], enumerable: true };
		}
		Object.defineProperties(context, descriptors);
	}

	setLayerCakeContext(/** @type {import('./context.js').LayerCakeContext} */ (context));

	$effect(() => {
		if (debug === true) {
			/** @type {Object.<string, any>} */
			const debugInfo = {
				data,
				flatData: flatDataProp !== undefined ? flatData : null,
				boundingBox: {
					top: padding.top,
					right: containerWidth - padding.right,
					bottom: containerHeight - padding.bottom,
					left: padding.left,
					width,
					height
				},
				activeGetters
			};
			for (const name of Object.keys(activeGetters)) {
				debugInfo[name] = dimProps[name];
				debugInfo[`${name}Scale`] = dims[name].scale;
			}
			// Call this as a debounce so that it doesn't get called multiple times as these vars get filled in
			printDebug_debounced(debugInfo);
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
		{@render children?.(context)}
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
