import padScale from '../utils/padScale.js';
import hasPristineRange from '../utils/hasPristineRange.js';
import getDefaultRange from '../settings/getDefaultRange.js';

/**
 * Whether an interpolator is d3's identity placeholder, meaning nobody
 * picked a real one. Recognized by behavior instead of function name – production
 * minifiers rename d3's internal `identity`, so a name check passes in dev
 * builds and fails in prod.
 * @param {any} interpolate The scale's interpolator.
 * @returns {boolean}
 */
function isIdentityInterpolator(interpolate) {
	return (
		typeof interpolate === 'function' &&
		interpolate(0) === 0 &&
		interpolate(0.5) === 0.5 &&
		interpolate(1) === 1
	);
}

/**
 * Add a middle stop to a two-value range when the scale needs three.
 *
 * Diverging scales run low -> middle -> high, so they read three range stops
 * where most scales read two. Hand one a two-stop range and its middle and high
 * ends come out empty, so the scale returns `undefined` for nearly every value.
 * The stop we add sits halfway between the two given ones.
 * @param {any} scale The scale being configured.
 * @param {Array<any>} range The range about to be set on it.
 * @returns {Array<any>} The range, with a middle stop added when the scale needs one.
 */
function fitRangeToScale(scale, range) {
	// A piecewise linear scale can hold three stops too, and there a two-stop
	// range is a fine thing to ask for. Only the diverging family both reports
	// three stops and interpolates between them, which `.interpolator` marks.
	const wantsThreeStops = typeof scale.interpolator === 'function' && scale.range().length === 3;
	if (
		wantsThreeStops &&
		range.length === 2 &&
		typeof range[0] === 'number' &&
		typeof range[1] === 'number'
	) {
		return [range[0], (range[0] + range[1]) / 2, range[1]];
	}
	return range;
}

/**
 * Create a fully configured scale for a dimension.
 * @param {Object} config
 * @param {import('../settings/dimensions.js').Dimension} config.dimension The dimension's definition from settings/dimensions.js – its name, default scale and so on.
 * @param {any} config.scale The user-passed `[name]Scale` prop – an instantiated D3 scale – or undefined to use the dimension's default.
 * @param {Array<any>|undefined} config.domain The computed domain, or undefined to keep the scale's own domain.
 * @param {[number, number]|undefined} config.padding The user-passed `[name]Padding` prop.
 * @param {boolean|number} config.nice The resolved `[name]Nice` value.
 * @param {boolean} config.reverse The resolved `[name]Reverse` value.
 * @param {Array<any>|Function|undefined} config.range The user-passed `[name]Range` prop.
 * @param {import('../state/dimension.svelte.js').DimensionContext} config.ctx Reactive chart-level values.
 * @returns {any} The scale.
 */
export default function createScale({
	dimension,
	scale: scaleProp,
	domain,
	padding,
	nice,
	reverse,
	range,
	ctx
}) {
	if (scaleProp !== undefined && typeof scaleProp.copy !== 'function') {
		throw new Error(
			`[LayerCake] The \`${dimension.name}Scale\` prop must be an instantiated scale, e.g. \`scaleLinear()\` rather than \`scaleLinear\`.`
		);
	}
	// Make a copy of the user-provided scale to guard against user mutations.
	const scale = scaleProp === undefined ? dimension.defaultScale() : scaleProp.copy();

	// Set the domain if we measured one from the data or the user passed one.
	// If we have neither – say the user only passed a scale that already has
	// its own domain – keep the domain the scale came with
	if (domain !== undefined) {
		scale.domain(domain);
	}

	// A range can be computed by a function from either of two places: the
	// `defaultRange` each dimension declares in settings/dimensions.js, or a
	// `[name]Range` prop the user writes as a function. Both get the object
	// below, whose properties DimensionRangeContext documents. The dimension's
	// own entry is left out of `scales`, so a range function can't re-enter the
	// scale it is helping to build.
	/** @type {Object.<string, any>} */
	const siblingScales = {};
	for (const key of Object.keys(ctx.scales)) {
		if (key === dimension.name) continue;
		Object.defineProperty(siblingScales, key, {
			get: () => ctx.scales[key],
			enumerable: true
		});
	}
	/** @type {import('../settings/dimensions.js').DimensionRangeContext} */
	const rangeCtx = {
		get width() {
			return ctx.width;
		},
		get height() {
			return ctx.height;
		},
		get percentRange() {
			return ctx.percentRange;
		},
		// The chart's size in the units ranges are measured in – 100 in
		// percent mode, pixels otherwise. Nested dimensions size themselves off
		// these, so they never mix percentages and pixels.
		get rangeWidth() {
			return ctx.percentRange === true ? 100 : ctx.width;
		},
		get rangeHeight() {
			return ctx.percentRange === true ? 100 : ctx.height;
		},
		scales: siblingScales
	};

	// Don't stomp a range the user baked into their own scale –
	// `zScale={scaleOrdinal(schemeCategory10)}` would lose its colors. An explicit
	// `zRange` is the clearer instruction, so that still wins.
	const keepScaleRange =
		scaleProp !== undefined && range === undefined && hasPristineRange(scale) === false;

	// `getDefaultRange` hands back the `[name]Range` prop when the user set one,
	// so this holds whichever range we are about to apply. Null means we apply
	// none and the scale keeps the range it arrived with.
	const rangeToApply = keepScaleRange
		? null
		: getDefaultRange(dimension, { reverse, range, ctx: rangeCtx });

	// A scale that makes its own output through an interpolator, like
	// `scaleSequential`, would be broken by the chart's default range. d3's
	// identity placeholder means nobody picked an interpolator, so that is the
	// one interpolator safe to overwrite.
	const scaleMakesOwnOutput =
		typeof scale.interpolator === 'function' && !isIdentityInterpolator(scale.interpolator());

	// An explicit `[name]Range` prop always wins, interpolator or not –
	// the check above only protects the scale from the chart's *default* range
	if (rangeToApply !== null && (range !== undefined || scaleMakesOwnOutput === false)) {
		scale.range(fitRangeToScale(scale, rangeToApply));
	}

	// If we have padding, adjust the domain to account for it.
	if (padding) {
		scale.domain(padScale(scale, padding));
	}

	if (nice === true || typeof nice === 'number') {
		if (typeof scale.nice === 'function') {
			scale.nice(typeof nice === 'number' ? nice : undefined);
		} else {
			console.error(
				`[Layer Cake] You set \`${dimension.name}Nice: true\` but the ${dimension.name}Scale does not have a \`.nice\` method. Ignoring...`
			);
		}
	}

	return scale;
}
