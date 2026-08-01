import padScale from '../utils/padScale.js';
import hasPristineRange from '../utils/hasPristineRange.js';
import getDefaultRange from '../settings/getDefaultRange.js';

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

	// Don't stomp a range the user baked into their own scale –
	// `zScale={scaleOrdinal(schemeCategory10)}` would lose its colors. An explicit
	// `zRange` is the clearer instruction, so that still wins.
	const keepScaleRange =
		scaleProp !== undefined && range === undefined && hasPristineRange(scale) === false;

	const defaultRange = keepScaleRange ? null : getDefaultRange(dimension, { reverse, range, ctx });

	// Same for scales that make their own output, like `scaleSequential` – a range
	// would break the color interpolator. d3's identity placeholder is safe to
	// overwrite though, since it means nobody picked one.
	if (
		defaultRange !== null &&
		(!scale.interpolator ||
			(typeof scale.interpolator === 'function' &&
				scale.interpolator().name.startsWith('identity')))
	) {
		scale.range(defaultRange);
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
