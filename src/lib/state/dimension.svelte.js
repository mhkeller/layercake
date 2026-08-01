import makeAccessor from '../utils/makeAccessor.js';
import calcDomain from '../helpers/calcDomain.js';
import createScale from '../helpers/createScale.js';
import createGetter from '../helpers/createGetter.js';
import getRange from '../helpers/getRange.js';
import isOrdinalDomain from '../helpers/isOrdinalDomain.js';
import { DEFAULT_IS_ORDINAL } from '../settings/dimensions.js';

/**
 * The reactive chart-level values a dimension reads. Every property is a
 * lazy getter – a scale only depends on the values it actually reads.
 * @typedef {Object} DimensionContext
 * @property {number} width The calculated chart width.
 * @property {number} height The calculated chart height.
 * @property {boolean} percentRange Whether supporting scale ranges should be `[0, 100]`.
 * @property {Object.<string, Array<any>>} extents The measured extents keyed by dimension name.
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
 * @param {() => Object.<string, any>} getProps Returns the dimension props object, read reactively by name, e.g. `getProps().xDomain`.
 * @param {DimensionContext} ctx Reactive chart-level values.
 */
export default function createDimension(dimension, getProps, ctx) {
	const name = dimension.name;
	const features = dimension.features;

	const props = $derived(getProps());

	const accessorRaw = $derived(props[name]);
	const accessor = $derived(accessorRaw != null ? makeAccessor(accessorRaw) : null);

	const scaleProp = $derived(props[`${name}Scale`]);
	const domainProp = $derived(props[`${name}Domain`]);
	const rangeProp = $derived(props[`${name}Range`]);

	const active = $derived(
		accessor !== null ||
			domainProp !== undefined ||
			scaleProp !== undefined ||
			rangeProp !== undefined
	);

	const nice = $derived(features.nice === true ? (props[`${name}Nice`] ?? false) : false);
	const padding = $derived(features.padding === true ? props[`${name}Padding`] : undefined);
	const domainSort = $derived(
		features.domainSort === true ? (props[`${name}DomainSort`] ?? false) : false
	);
	const reverse = $derived.by(() => {
		if (features.reverse !== true) return false;
		const value = props[`${name}Reverse`];
		if (value !== undefined) return value;
		return dimension.defaultReverse ? dimension.defaultReverse({ scale: scaleProp }) : false;
	});

	/**
	 * Whether this dimension measures unique values rather than a min and max.
	 * Answered from the props alone, because the extents have to be measured
	 * before the real scale – which needs a domain – can exist. When the user
	 * didn't pass a scale the answer is already in the registry, so we don't
	 * build one just to ask.
	 */
	const isOrdinal = $derived(
		scaleProp !== undefined ? isOrdinalDomain(scaleProp) : DEFAULT_IS_ORDINAL[name]
	);

	const domain = $derived(active === true ? calcDomain(name, ctx.extents, domainProp) : undefined);

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
	const domainOut = $derived(scale ? scale.domain() : undefined);
	const rangeOut = $derived(scale ? getRange(scale) : undefined);

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
