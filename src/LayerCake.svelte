<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';

	import makeAccessor from './utils/makeAccessor.js';
	import calcExtents from './lib/calcExtents.js';
	import partialDomain from './utils/partialDomain.js';
	import getDefaultRange from './settings/getDefaultRange.js';
	import { xDefault, yDefault, rDefault } from './settings/defaultScales.js';
	import padScale from './utils/padScale.js';

	export let containerWidth = 345;
	export let containerHeight = 140;

	// export let foo = undefined;

	// const foo_store = writable();
	// $: foo_store.set(foo == null ? calculate_foo() : foo);

	/* --------------------------------------------
	 * Core values
	 */
	export let x;
	export let y;
	export let r;
	export let custom = {};
	export let data = [];

	/* --------------------------------------------
	 * Parameters
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 * Add the core values to the end of this object
	 */
	export let xDomain;
	export let yDomain;
	export let rDomain;
	export let xNice = false;
	export let yNice = false;
	export let rNice = false;
	export let reverseX = false;
	export let reverseY = true;
	export let xPadding = [0, 0];
	export let yPadding = [0, 0];
	export let rPadding = [0, 0];
	export let xScale = xDefault();
	export let yScale = yDefault();
	export let rScale = rDefault();
	export let rRange;
	export let padding = {};

	export let flatData;

	const _xDomain = writable();
	const _yDomain = writable();
	const _rDomain = writable();
	const _xNice = writable(xNice);
	const _yNice = writable(yNice);
	const _rNice = writable(rNice);
	const _reverseX = writable(reverseX);
	const _reverseY = writable(reverseY);
	const _xPadding = writable(xPadding);
	const _yPadding = writable(yPadding);
	const _rPadding = writable(rPadding);
	const _xScale = writable(xScale);
	const _yScale = writable(yScale);
	const _rScale = writable(rScale);
	const _rRange = writable(rRange);
	const _padding = writable(padding);

	const _flatData = writable(flatData || data);

	/* --------------------------------------------
	 * Preserve a copy of our passed in settings before we modify them
	 * Return this to the user's context so they can reference things if need be
	 * Add the active keys since those aren't on our settings object.
	 * This is mostly an escape-hatch
	 */
	$: originalSettings = {
		xDomain,
		yDomain,
		rDomain,
		xNice: $_xNice,
		yNice: $_yNice,
		rNice: $_rNice,
		reverseX: $_reverseX,
		reverseY: $_reverseY,
		xPadding: $_xPadding,
		yPadding: $_yPadding,
		rPadding: $_rPadding,
		xScale: $_xScale,
		yScale: $_yScale,
		rScale: $_rScale,
		rRange: $_rRange,
		padding: $_padding,
		flatData: $_flatData
	};


	/* --------------------------------------------
	 * Our main accessors
	 */
	const _x = writable();
	const _y = writable();
	const _r = writable();

	$: _x.set(makeAccessor(x));
	$: _y.set(makeAccessor(y));
	$: _r.set(makeAccessor(r));

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

	// $: console.log('x', $_xDomain);
	// $: console.log('y', $_yDomain);
	// $: console.log('r', $_rDomain);

	const context = {
		containerWidth: writable(containerWidth),
		containerHeight: writable(containerHeight),
		activeGetters: _activeGetters,
		xDomain: _xDomain,
		yDomain: _yDomain,
		rDomain: _rDomain,
		xNice: _xNice,
		yNice: _yNice,
		rNice: _rNice,
		reverseX: _reverseX,
		reverseY: _reverseY,
		xPadding: _xPadding,
		yPadding: _yPadding,
		rPadding: _rPadding,
		x: _x,
		y: _y,
		r: _r,
		xScale: _xScale,
		yScale: _yScale,
		rScale: _rScale,
		data: writable(data),
		custom: writable(custom),
		flatData: _flatData,
		extents: _extents,
		originalSettings: writable({})
	};

	$: context.containerWidth.set(containerWidth);
	$: context.containerHeight.set(containerHeight);
	// $: context.activeKeys.set(settings.activeKeys);
	// $: context.activeGetters.set(settings.activeGetters);
	// $: context.xDomain.set(settings.xDomain);
	// $: context.yDomain.set(settings.yDomain);
	// $: context.rDomain.set(settings.rDomain);
	// $: context.xNice.set(xNice);
	// $: context.yNice.set(yNice);
	// $: context.rNice.set(rNice);
	// $: context.reverseX.set(reverseX);
	// $: context.reverseY.set(reverseY);
	// $: context.xPadding.set(xPadding);
	// $: context.yPadding.set(yPadding);
	// $: context.rPadding.set(rPadding);
	// $: if (context.x) context.x.set(settings.x);
	// $: if (context.y) context.y.set(settings.y);
	// $: if (context.r) context.r.set(settings.r);
	$: context.data.set(data);
	$: context.custom.set(custom);
	$: context.originalSettings.set(originalSettings);
	// $: context.flatData.set(settings.flatData);
	// $: context.domains.set(settings.domains);

	/* --------------------------------------------
	 * This should be updated whenever width and height changes
	 * since the padding may update based on media queries
	 * TODO, add ability to take padding from css padding
	 */
	$: {
		context.padding = derived([context.containerWidth, context.containerHeight], () => {
			const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
			return Object.assign(defaultPadding, $_padding);
		});

		context.box = derived([context.containerWidth, context.containerHeight, context.padding], ([$containerWidth, $containerHeight, $padding]) => {
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

		context.width = derived([context.box], ([$box]) => {
			return $box.width;
		});

		context.height = derived([context.box], ([$box]) => {
			return $box.height;
		});
	}

	console.log('here');
	$: {
		console.log('therere');
		/* --------------------------------------------
		 * Compute every scale we have an accessor for
		 */
		$_activeGetters.forEach(k => {
			console.log('here');
			const thisScale = `${k.field}Scale`;
			console.log(thisScale, 'adsfas');
			context[thisScale] = derived([context[thisScale], context.box, context.extents, context[`${k.field}Domain`], context[`${k.field}Padding`], context[`${k.field}Nice`]], ([$scaler, $box, $extents, $thisDoughmain, $thisPadding, $thisNice]) => {
				console.log('c');
				if ($extents === null) {
					return null;
				}

				console.log('a');
				// const defaultRange = getDefaultRange(k.field, settings, $box.width, $box.height);
				const defaultRange = [0, $box.width];

				// const scale = $scaler
				// 	? settings[thisScale].copy()
				// 	: defaultScales[k.field]();

				const scale = $scaler.copy();


				/* --------------------------------------------
				 * On creation, `thisDoughmain` will already have any nulls filled in
				 * But if we set it via the context it might not, so rerun it through partialDomain
				 */
				scale
					.domain(partialDomain($extents[k.field], $thisDoughmain))
					.range(defaultRange);

				if ($thisPadding) {
					scale.domain(padScale(scale, $thisPadding));
				}

				if ($thisNice === true) {
					if (typeof scale.nice === 'function') {
						scale.nice();
					} else {
						console.error(`Layer Cake warning: You set \`${k.field}Nice: true\` but the ${k.field}Scale does not have a \`.nice\` method. Ignoring...`);
					}
				}

				console.log(scale);

				return scale;
			});

			/* --------------------------------------------
			 * Compute a shorthand function to get the value and convert it using its scale
			 * exposed as `xGet`, `yGet` or `rGet`.
			 */
			const getter = `${k.field}Get`;
			context[getter] = derived(
				[context[k.field], context[thisScale]],
				([$acc, $scaler]) => {
					return d => {
						const val = $acc(d);
						if (Array.isArray(val)) {
							return val.map(v => $scaler(v));
						}
						return $scaler(val);
					};
				}
			);
		});
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
