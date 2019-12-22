<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';

	import makeAccessor from './utils/makeAccessor.js';
	import calcExtents from './lib/calcExtents.js';
	import partialDomain from './utils/partialDomain.js';
	import getDefaultRange from './settings/getDefaultRange.js';
	import defaultScales from './settings/defaultScales.js';
	import padScale from './utils/padScale.js';

	export let containerWidth = 320;
	export let containerHeight = 250;

	/* --------------------------------------------
	 * Core values
	 */
	export let x;
	export let y;
	export let r;
	export let custom = {};
	export let data = [];

	/* --------------------------------------------
	 * Settings
	 * Values that computed properties are based on and that
	 * can be easily extended from config values
	 *
	 * Add the core values to the end of this object
	 */
	export let xDomain;
	export let yDomain;
	export let rDomain;
	export let xNice;
	export let yNice;
	export let rNice;
	export let reverseX;
	export let reverseY = true;
	export let xPadding;
	export let yPadding;
	export let rPadding;
	export let xScale;
	export let yScale;
	export let rScale;
	export let rRange;
	export let padding = {};

	export let flatData;

	const keys = [
		{ dimension: 'x', fn: x },
		{ dimension: 'y', fn: y },
		{ dimension: 'r', fn: r }
	];

	const settings = {
		activeKeys: keys.filter(k => k.fn),
		activeGetters: [],
		xDomain,
		yDomain,
		rDomain,
		xNice,
		yNice,
		rNice,
		reverseX,
		reverseY,
		xPadding,
		yPadding,
		rPadding,
		xScale,
		yScale,
		rScale,
		rRange,
		padding,

		containerWidth,
		containerHeight,
		data,
		custom
	};

	/* --------------------------------------------
	 * Preserve a copy of our passed in settings before we modify them
	 * Return this to the user's context so they can reference things if need be
	 * This is mostly an escape-hatch
	 */
	const originalSettings = { ...settings };

	/* --------------------------------------------
	 * Make accessors for every active key
	 */
	settings.activeKeys.forEach(k => {
		settings[k.dimension] = makeAccessor(k.fn);
		settings.activeGetters.push({ dimension: k.dimension, get: settings[k.dimension] });
	});

	if (settings.data) {
		settings.flatData = flatData || settings.data;
		settings.domains = calcExtents(settings.flatData, settings.activeKeys.map(k => {
			return {
				field: k.dimension,
				accessor: settings[k.dimension]
			};
		}));

		settings.activeKeys.forEach(k => {
			const thisDomain = `${k.dimension}Domain`;
			settings[thisDomain] = partialDomain(settings.domains[k.dimension], originalSettings[thisDomain]);
		});
	}

	/* --------------------------------------------
	 * We're going to add everything in settings and config onto the context
	 * except for a few that are computed down below, so omit this from what gets
	 * sent to super
	 */
	const computedValues = [
		...settings.activeKeys.map(k => `${k.dimension}Scale`),
		'rRange'
	];

	const context = {
		originalSettings
	};

	Object.keys(settings).forEach(s => {
		if (!computedValues.includes(s)) {
			context[s] = writable(settings[s]);
		}
	});

	$: context.containerWidth.set(containerWidth);
	$: context.containerHeight.set(containerHeight);
	$: context.activeKeys.set(settings.activeKeys);
	$: context.activeGetters.set(settings.activeGetters);
	$: context.xDomain.set(settings.xDomain);
	$: context.yDomain.set(settings.yDomain);
	$: context.rDomain.set(settings.rDomain);
	$: context.xNice.set(xNice);
	$: context.yNice.set(yNice);
	$: context.rNice.set(rNice);
	$: context.reverseX.set(reverseX);
	$: context.reverseY.set(reverseY);
	$: context.xPadding.set(xPadding);
	$: context.yPadding.set(yPadding);
	$: context.rPadding.set(rPadding);
	$: if (context.x) context.x.set(settings.x);
	$: if (context.y) context.y.set(settings.y);
	$: if (context.r) context.r.set(settings.r);
	$: context.data.set(data);
	$: context.custom.set(custom);
	$: context.flatData.set(flatData);
	$: context.domains.set(settings.domains);

	/* --------------------------------------------
	 * This should be updated whenever width and height changes
	 * since the padding may update based on media queries
	 * TODO, add ability to take padding from css padding
	 */
	context.padding = derived([context.containerWidth, context.containerHeight], () => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, settings.padding);
	});

	context.box = derived(
		[context.containerWidth, context.containerHeight, context.padding],
		([$containerWidth, $containerHeight, $padding]) => {
			const b = {};
			b.top = $padding.top;
			b.right = $containerWidth - $padding.right;
			b.bottom = $containerHeight - $padding.bottom;
			b.left = $padding.left;
			b.width = b.right - b.left;
			b.height = b.bottom - b.top;
			return b;
		}
	);

	context.width = derived([context.box], ([$box]) => {
		return $box.width;
	});

	context.height = derived([context.box], ([$box]) => {
		return $box.height;
	});

	if (settings.data) {
		// TODO, figure out how best to update domains if the data has changed

		/* --------------------------------------------
		 * Compute every scale we have an accessor for
		 */
		settings.activeKeys.forEach(k => {
			const thisScale = `${k.dimension}Scale`;
			context[thisScale] = derived(
				[context.box, context.domains, context[`${k.dimension}Domain`]],
				([$box, $domains, $thisDoughmain]) => {
					if ($domains === null) {
						return null;
					}

					const defaultRange = getDefaultRange(k.dimension, settings, $box.width, $box.height);

					const scale = settings[thisScale]
						? settings[thisScale].copy()
						: defaultScales[k.dimension]();

					/* --------------------------------------------
					 * On creation, `thisDoughmain` will already have any nulls filled in
					 * But if we set it via the context it might not, so rerun it through partialDomain
					 */
					scale
						.domain(partialDomain($domains[k.dimension], $thisDoughmain))
						.range(defaultRange);

					if (settings[`${k.dimension}Padding`]) {
						console.log('adjusting by', settings[`${k.dimension}Padding`]);
						console.log('old', scale.domain());
						scale.domain(padScale(scale, settings[`${k.dimension}Padding`]));
						console.log('new', scale.domain());
					}

					if (settings[`${k.dimension}Nice`] === true) {
						if (typeof scale.nice === 'function') {
							scale.nice();
						} else {
							console.error(`Layer Cake warning: You set \`${k.dimension}Nice: true\` but the ${k.dimension}Scale does not have a \`.nice\` method. Ignoring...`);
						}
					}

					return scale;
				}
			);

			/* --------------------------------------------
			 * Compute a shorthand function to get the value and convert it using its scale
			 * exposed as `xGet`, `yGet` or `rGet`.
			 */
			const getter = `${k.dimension}Get`;
			context[getter] = derived(
				[context[k.dimension], context[thisScale]],
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

	setContext('LayerCake', context);
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
