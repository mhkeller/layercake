import makeAccessor from '../utils/makeAccessor.js';
import isCompleteDomain from '../utils/isCompleteDomain.js';
import keepIfEqual from '../utils/keepIfEqual.js';
import calcDomain from '../helpers/calcDomain.js';
import createScale from '../helpers/createScale.js';
import createGetter from '../helpers/createGetter.js';
import getRange from '../helpers/getRange.js';
import isOrdinalDomain from '../helpers/isOrdinalDomain.js';
import measureExtent from '../helpers/measureExtent.js';
import extentProblems from '../helpers/extentProblems.js';

/**
 * The reactive chart-level values a dimension reads. Every property is a
 * lazy getter – a scale only depends on the values it actually reads.
 * @typedef {Object} DimensionContext
 * @property {number} width The calculated chart width.
 * @property {number} height The calculated chart height.
 * @property {boolean} percentRange Whether supporting scale ranges should be `[0, 100]`.
 * @property {Array<any>} measurableData The rows to measure extents from. Reading it throws a clear TypeError when the data isn't a measurable list.
 * @property {boolean} verbose Whether to print console warnings.
 * @property {Object.<string, Function|undefined>} scales Lazy access to every dimension's computed scale, for nested-scale range functions.
 */

/**
 * Create the reactive state for one dimension. Called for every dimension, not
 * just the ones in use. Unsupported features resolve to inert defaults so their
 * pipeline steps no-op.
 *
 * A dimension is active once the user sets any of its four configurable props –
 * the accessor, domain, scale or range. Inactive dimensions return `undefined`
 * for all computed values.
 * @param {import('../settings/dimensions.js').Dimension} dimension The dimension's definition from settings/dimensions.js – its name, default scale and so on.
 * @param {Object.<string, any>} props The dimension props object. It is Svelte's rest-props proxy, so reading `props.xDomain` here tracks that one prop.
 * @param {DimensionContext} ctx Reactive chart-level values.
 */
export default function createDimension(dimension, props, ctx) {
	const name = dimension.name;
	const features = dimension.features;

	const defaultIsOrdinal = isOrdinalDomain(dimension.defaultScale());

	// Coerces null into undefined, so a prop like
	// `xScale={cond ? myScale : null}` means "unset". Every check downstream –
	// activation here, `keepScaleRange` and the default range in createScale.js –
	// can then test against undefined alone.
	const accessorRaw = $derived(props[name] ?? undefined);
	const accessor = $derived(accessorRaw !== undefined ? makeAccessor(accessorRaw) : null);

	const scaleProp = $derived(props[`${name}Scale`] ?? undefined);
	const domainProp = $derived(props[`${name}Domain`] ?? undefined);
	const rangeProp = $derived(props[`${name}Range`] ?? undefined);

	const active = $derived(
		accessor !== null ||
			domainProp !== undefined ||
			scaleProp !== undefined ||
			rangeProp !== undefined
	);

	const nice = $derived(features.nice === true ? (props[`${name}Nice`] ?? false) : false);
	const padding = $derived(
		features.padding === true ? (props[`${name}Padding`] ?? undefined) : undefined
	);
	// DomainSort applies to every dimension, so there is no feature flag to consult
	const domainSort = $derived(props[`${name}DomainSort`] ?? false);
	const reverse = $derived.by(() => {
		if (features.reverse !== true) return false;
		const value = props[`${name}Reverse`] ?? undefined;
		if (value !== undefined) return value;
		return dimension.defaultReverse ? dimension.defaultReverse({ scale: scaleProp }) : false;
	});

	/**
	 * Whether this dimension measures unique values rather than a min and max.
	 * Answered from the props alone, because the extents have to be measured
	 * before the real scale – which needs a domain – can exist.
	 */
	const isOrdinal = $derived(
		scaleProp !== undefined ? isOrdinalDomain(scaleProp) : defaultIsOrdinal
	);

	// The user answered the domain question outright, so there is nothing to measure
	const presetDomain = $derived(isCompleteDomain(domainProp) ? domainProp : undefined);

	// Each fires at most once per chart, not once per repaint
	let warnedEmptyExtent = false;
	let warnedStringExtent = false;

	// Each dimension measures its own extent. Changing one dimension's
	// accessor or domain rescans the data for that dimension alone
	const measuredExtent = $derived.by(() => {
		if (accessor === null || presetDomain !== undefined) return undefined;
		const data = ctx.measurableData;
		const extent = measureExtent(name, accessor, data, isOrdinal, domainSort === true);
		// Say something about the two classic silent failures. Only min/max
		// extents can show them – unique-value measuring has no empty/strings shape.
		if (isOrdinal !== true && ctx.verbose === true) {
			const problem = extentProblems(extent, data.length);
			if (problem === 'empty' && warnedEmptyExtent === false) {
				warnedEmptyExtent = true;
				console.warn(
					`[LayerCake] The \`${name}\` accessor found no usable values, so the ${name} domain is empty. A typo in the accessor key does this – every row returns undefined.`
				);
			}
			if (problem === 'strings' && warnedStringExtent === false) {
				warnedStringExtent = true;
				console.warn(
					`[LayerCake] The measured ${name} extent contains strings, most often numbers still in their CSV form. Strings compare alphabetically ('9' > '10'), so the domain is likely wrong. Convert them with \`+value\` or d3's \`autoType\`.`
				);
			}
		}
		return extent;
	});

	// What the domain pipeline and the context's `extents` see for this dimension
	const extent = $derived(presetDomain !== undefined ? presetDomain : measuredExtent);

	// When nothing was measured – a dimension activated by its scale, domain
	// or range prop alone – the scale's own current domain stands in. A domain
	// function then always receives real values, exactly as documented, and a
	// partial `[null, 100]` fills its null from them.
	const fallbackDomain = $derived.by(() => {
		const scale = scaleProp !== undefined ? scaleProp : dimension.defaultScale();
		return typeof scale.domain === 'function' ? scale.domain() : undefined;
	});

	const domain = $derived(
		active === true ? calcDomain(extent ?? fallbackDomain, domainProp) : undefined
	);

	const scale = $derived(
		active === true
			? createScale({
					dimension,
					scale: scaleProp,
					domain,
					padding,
					nice,
					reverse,
					range: rangeProp,
					ctx
				})
			: undefined
	);

	const get = $derived(accessor && scale ? createGetter(accessor, scale) : undefined);

	// The domain and range are read back off the scale so that
	// modifications made on scale creation, such as `.nice()`, are reflected
	/** @type {Array<any>|null|undefined} */
	let lastDomain;
	const domainOut = $derived.by(() => {
		lastDomain = keepIfEqual(lastDomain, scale ? scale.domain() : undefined);
		return lastDomain;
	});
	/** @type {Array<any>|null|undefined} */
	let lastRange;
	const rangeOut = $derived.by(() => {
		lastRange = keepIfEqual(lastRange, scale ? getRange(scale) : undefined);
		return lastRange;
	});

	return {
		get active() {
			return active;
		},
		get accessor() {
			return accessor;
		},
		get isOrdinal() {
			return isOrdinal;
		},
		get nice() {
			return nice;
		},
		get padding() {
			return padding;
		},
		get reverse() {
			return reverse;
		},
		get domainSort() {
			return domainSort;
		},
		get extent() {
			return extent;
		},
		get domain() {
			return domainOut;
		},
		get range() {
			return rangeOut;
		},
		get scale() {
			return scale;
		},
		get get() {
			return get;
		}
	};
}
