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
 * The chart-level values a dimension reads. Every property is a getter, so a
 * scale only reruns when a value it actually read changes.
 * @typedef {Object} DimensionContext
 * @property {number} width The calculated chart width.
 * @property {number} height The calculated chart height.
 * @property {boolean} percentRange Whether supporting scale ranges should be `[0, 100]`.
 * @property {Array<any>} measurableData The rows to measure from. Reading it throws a TypeError if the data isn't an array.
 * @property {boolean} verbose Whether to print console warnings.
 * @property {Object.<string, Function|undefined>} scales Every dimension's computed scale, looked up through getters. A nested dimension's range function reads its parent's scale here.
 */

/**
 * Create the reactive state for one dimension. This runs for every dimension,
 * not just the ones in use. A feature the dimension doesn't support, like
 * `nice` on `c`, gets a default that does nothing.
 *
 * A dimension is active once the user sets any of its accessor, domain, scale
 * or range props. An inactive dimension returns `undefined` for every computed
 * value.
 * @param {import('../settings/dimensions.js').Dimension} dimension The dimension's entry in the registry in settings/dimensions.js.
 * @param {Object.<string, any>} props The dimension props. Svelte tracks each key on its own, so reading `props.xDomain` here reruns only when `xDomain` changes.
 * @param {DimensionContext} ctx Reactive chart-level values.
 */
export default function createDimension(dimension, props, ctx) {
	const name = dimension.name;
	const features = dimension.features;

	const defaultIsOrdinal = isOrdinalDomain(dimension.defaultScale());

	// `?? undefined` turns a null prop into undefined, so
	// `xScale={cond ? myScale : null}` means "not set". Every check after this
	// only has to compare against undefined.
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
	// Every dimension supports DomainSort, so there is no feature flag to check
	const domainSort = $derived(props[`${name}DomainSort`] ?? false);
	const reverse = $derived.by(() => {
		if (features.reverse !== true) return false;
		const value = props[`${name}Reverse`] ?? undefined;
		if (value !== undefined) return value;
		return dimension.defaultReverse ? dimension.defaultReverse({ scale: scaleProp }) : false;
	});

	/**
	 * Whether this dimension measures a list of unique values instead of a min
	 * and max. This is worked out from the props alone. The real scale can't
	 * exist yet. It needs a domain first, which comes from measuring.
	 */
	const isOrdinal = $derived(
		scaleProp !== undefined ? isOrdinalDomain(scaleProp) : defaultIsOrdinal
	);

	// The user passed a full domain, so there is nothing to measure
	const presetDomain = $derived(isCompleteDomain(domainProp) ? domainProp : undefined);

	// Each warning prints once per chart, not on every rerender
	let warnedEmptyExtent = false;
	let warnedStringExtent = false;

	// Each dimension measures its own extent. Changing the x accessor rescans
	// the data for x only. The other dimensions don't rerun.
	const measuredExtent = $derived.by(() => {
		if (accessor === null || presetDomain !== undefined) return undefined;
		const data = ctx.measurableData;
		const extent = measureExtent(name, accessor, data, isOrdinal, domainSort === true);
		// Warn about the two common mistakes that otherwise fail silently: a
		// misspelled accessor key and numbers that are still strings. Only a
		// min/max extent can show them. A list of unique values can't.
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

	// The extent the domain is built from. Also what `k.extents` reports for this dimension.
	const extent = $derived(presetDomain !== undefined ? presetDomain : measuredExtent);

	// When there is no accessor, nothing gets measured. That happens when a
	// dimension is set up with only a scale, domain or range prop. The scale's own
	// domain is used instead. So a domain function always receives real values,
	// and a partial domain like `[null, 100]` still gets its null filled in.
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

	// Read the domain and range back off the finished scale so changes made while
	// building it, such as `.nice()`, show up. keepIfEqual hands back the previous
	// array when the values haven't changed, so children that depend on `k.xDomain`
	// don't rerun on every resize.
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
