import padScale from '../utils/padScale.js';
import hasPristineRange from '../utils/hasPristineRange.js';
import getDefaultRange from '../settings/getDefaultRange.js';

/**
 * Whether an interpolator is d3's placeholder that returns its input unchanged,
 * meaning nobody set a real one. We test what it does instead of checking its
 * name. Minifiers rename d3's internal `identity` function, so a name check
 * works in dev and breaks in production.
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
 * Diverging scales run low -> middle -> high, so they take three range stops
 * where most scales take two. Given only two stops, the middle and high ends
 * come out empty and the scale returns `undefined` for nearly every value. The
 * stop we add sits halfway between the two given ones.
 * @param {any} scale The scale being configured.
 * @param {Array<any>} range The range about to be set on it.
 * @returns {Array<any>} The range, with a middle stop added when the scale needs one.
 */
function fitRangeToScale(scale, range) {
	// A piecewise linear scale can have three stops too. Setting two on it is
	// fine. Only diverging scales both report three stops and have an
	// `.interpolator` method, so that's the check.
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
 * @param {import('../settings/dimensions.js').Dimension} config.dimension The dimension's entry in the registry in settings/dimensions.js.
 * @param {any} config.scale The user-passed `[name]Scale` prop, an instantiated D3 scale. Undefined means use the dimension's default.
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
	// Copy the user's scale so the domain and range we set here don't change their original.
	const scale = scaleProp === undefined ? dimension.defaultScale() : scaleProp.copy();

	// Set the domain if we measured one from the data or the user passed one.
	// Otherwise keep the domain the scale came with. That's the case when the
	// user only passed a scale that already has its own domain.
	if (domain !== undefined) {
		scale.domain(domain);
	}

	// A range function comes from one of two places: the `defaultRange` each
	// dimension declares in settings/dimensions.js, or a `[name]Range` prop the
	// user passes as a function. Both receive the object below. Its properties
	// are documented on DimensionRangeContext. This dimension's own scale is left
	// out of `scales`. Reading it would be circular, because the range is being
	// computed to build that very scale.
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
		// The chart's width and height in the same units as the ranges. That's
		// 100 in percent mode and pixels otherwise. Nested dimensions size
		// themselves off these, so they never mix percentages with pixels.
		get rangeWidth() {
			return ctx.percentRange === true ? 100 : ctx.width;
		},
		get rangeHeight() {
			return ctx.percentRange === true ? 100 : ctx.height;
		},
		scales: siblingScales
	};

	// Keep a range the user set on their own scale. Without this,
	// `zScale={scaleOrdinal(schemeCategory10)}` would lose its colors. An
	// explicit `zRange` prop still overrides it.
	const keepScaleRange =
		scaleProp !== undefined && range === undefined && hasPristineRange(scale) === false;

	// The range we're about to apply. `getDefaultRange` returns the user's
	// `[name]Range` prop when there is one and the default otherwise. Null means
	// apply none and keep the range the scale came with.
	const rangeToApply = keepScaleRange
		? null
		: getDefaultRange(dimension, { reverse, range, ctx: rangeCtx });

	// A scale like `scaleSequential` makes its output through an interpolator.
	// Setting the chart's default range on it would break it. The one exception
	// is d3's placeholder interpolator. That means nobody set one, so it's safe
	// to replace.
	const scaleMakesOwnOutput =
		typeof scale.interpolator === 'function' && !isIdentityInterpolator(scale.interpolator());

	// An explicit `[name]Range` prop is always applied, interpolator or not. The
	// check above only protects the scale from the chart's default range.
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
