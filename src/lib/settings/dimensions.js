import { scaleLinear, scaleSqrt, scaleBand, scaleOrdinal } from 'd3-scale';

import hasBandwidth from '../utils/hasBandwidth.js';
import isOrdinalDomain from '../helpers/isOrdinalDomain.js';
import nestedRange from '../helpers/nestedRange.js';

/**
 * The values available to a dimension's default range function. Every
 * property is a lazy getter – read only what the range needs.
 * @typedef {Object} DimensionRangeContext
 * @property {number} width The calculated chart width, i.e. the container width minus padding.
 * @property {number} height The calculated chart height, i.e. the container height minus padding.
 * @property {boolean} percentRange Whether the container-relative dimensions are measuring in percent rather than pixels.
 * @property {Object.<string, any>} scales The computed scales of sibling dimensions, e.g. `scales.x`. Only nested dimensions such as `x1` should reference siblings – a dimension referencing its own scale would create a cycle.
 */

/**
 * @typedef {Object} Dimension
 * @property {string} name The dimension's name. Its props are derived from it, e.g. `x` -> `xScale`, `xDomain`...
 * @property {Function} defaultScale An uninstantiated D3 scale factory used when the user doesn't pass a `[name]Scale` prop.
 * @property {(ctx: DimensionRangeContext) => Array<any>} defaultRange Returns the default range.
 * @property {(ctx: { scale: any }) => boolean} [defaultReverse] Dynamic default for `[name]Reverse`, receiving the user-passed scale prop (or undefined). Only consulted when the feature is enabled and the user didn't set the prop.
 * @property {boolean} canBePercentRange Whether the global `percentRange` prop applies to this dimension, replacing its default range with `[0, 100]`. Only sensible for spatial, container-relative ranges – bandwidth-based (`x1`, `y1`) and color (`c`, `c1`) ranges opt out.
 * @property {{ nice?: boolean, padding?: boolean, reverse?: boolean, domainSort?: boolean }} features Enables the key families that don't apply to every dimension (`Nice`, `Padding`, `Reverse`, `DomainSort`), keyed by the family's `familyStateKey`, e.g. `DomainSort` -> `domainSort`. The accessor, `Domain`, `Scale`, `Range` and `Get` apply to every dimension and need no entry.
 */

/** The full feature set, shared by x, y, z and r. */
const ALL_FEATURES = Object.freeze({ nice: true, padding: true, reverse: true, domainSort: true });

/** The default `c` range: d3's `schemeCategory10`, hardcoded to avoid a d3-scale-chromatic dependency. */
export const CATEGORICAL_COLORS = Object.freeze([
	'#1f77b4',
	'#ff7f0e',
	'#2ca02c',
	'#d62728',
	'#9467bd',
	'#8c564b',
	'#e377c2',
	'#7f7f7f',
	'#bcbd22',
	'#17becf'
]);

/**
 * The registry of every dimension LayerCake knows about. All per-dimension
 * behavior differences live here as data – the code paths that consume these
 * entries are identical for every dimension.
 * @type {Array<Dimension>}
 */
export const DIMENSIONS = [
	{
		name: 'x',
		defaultScale: scaleLinear,
		defaultRange: ctx => [0, ctx.width],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'y',
		defaultScale: scaleLinear,
		defaultRange: ctx => [0, ctx.height],
		// Unless the user says otherwise, flip the y-range so the axis grows
		// bottom-up – except for band scales, whose order should read top-down
		defaultReverse: ({ scale }) => !hasBandwidth(scale),
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'z',
		defaultScale: scaleLinear,
		defaultRange: ctx => [0, ctx.width],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'r',
		defaultScale: scaleSqrt,
		defaultRange: () => [1, 25],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'x1',
		defaultScale: scaleBand,
		defaultRange: ctx => nestedRange(ctx.scales.x, ctx.percentRange === true ? 100 : ctx.width),
		canBePercentRange: false,
		features: { domainSort: true }
	},
	{
		name: 'y1',
		defaultScale: scaleBand,
		defaultRange: ctx => nestedRange(ctx.scales.y, ctx.percentRange === true ? 100 : ctx.height),
		canBePercentRange: false,
		features: { domainSort: true }
	},
	{
		name: 'c',
		defaultScale: scaleOrdinal,
		defaultRange: () => [...CATEGORICAL_COLORS],
		canBePercentRange: false,
		features: { domainSort: true }
	},
	{
		name: 'c1',
		defaultScale: scaleLinear,
		defaultRange: () => [0, 1],
		canBePercentRange: false,
		features: { domainSort: true }
	}
];

/**
 * @typedef {Object} DimensionKeyFamily
 * @property {string} suffix Appended to the dimension name to form the prop and context key, e.g. `x` + `Domain` -> `xDomain`. The empty string is the accessor itself.
 * @property {boolean} isProp Whether users can pass this family as a component prop. Only `Get` can't be – it is computed, so it exists solely on the context.
 * @property {boolean} appliesToAllDimensions Whether the family applies to every dimension. Families that don't are enabled per dimension in its `features` object, looked up by the family's `familyStateKey`.
 * @property {boolean} addToConfig Whether the user-passed prop is also copied onto the context's read-only `config` object.
 */

/**
 * Every key family a dimension can have – one suffix across all dimensions,
 * forming keys such as `xDomain`, `yDomain`, `cDomain`. The Props typedef,
 * context keys, `config` object and unknown-prop warning are all generated
 * from this table.
 * @type {Array<DimensionKeyFamily>}
 */
export const DIMENSION_KEY_FAMILIES = [
	{ suffix: '', isProp: true, appliesToAllDimensions: true, addToConfig: true },
	{ suffix: 'Domain', isProp: true, appliesToAllDimensions: true, addToConfig: true },
	{ suffix: 'Scale', isProp: true, appliesToAllDimensions: true, addToConfig: false },
	{ suffix: 'Range', isProp: true, appliesToAllDimensions: true, addToConfig: true },
	{ suffix: 'Get', isProp: false, appliesToAllDimensions: true, addToConfig: false },
	{ suffix: 'Nice', isProp: true, appliesToAllDimensions: false, addToConfig: false },
	{ suffix: 'Padding', isProp: true, appliesToAllDimensions: false, addToConfig: false },
	{ suffix: 'Reverse', isProp: true, appliesToAllDimensions: false, addToConfig: false },
	{ suffix: 'DomainSort', isProp: true, appliesToAllDimensions: false, addToConfig: false }
];

/**
 * The key on the dimension state object (see `state/dimension.svelte.js`)
 * holding a family's computed value: the suffix with its first letter
 * lowercased, e.g. `DomainSort` -> `domainSort`. The accessor family (the
 * empty suffix) is stored as `accessor`.
 * @param {DimensionKeyFamily} family The key family.
 * @returns {string}
 */
export function familyStateKey(family) {
	if (family.suffix === '') return 'accessor';
	return family.suffix[0].toLowerCase() + family.suffix.slice(1);
}

/**
 * Whether a dimension supports a key family.
 * @param {Dimension} dimension The dimension's definition – its name, default scale and so on.
 * @param {DimensionKeyFamily} family The key family.
 * @returns {boolean}
 */
export function dimensionHasFamily(dimension, family) {
	if (family.appliesToAllDimensions === true) return true;
	// `features` has a fixed set of keys so registry typos fail to compile. This
	// lookup builds the key at runtime, so widen the type just for this read.
	const features = /** @type {Object.<string, boolean|undefined>} */ (dimension.features);
	return features[familyStateKey(family)] === true;
}

/**
 * The key families each dimension supports, keyed by dimension name.
 * Computed once – both tables are static.
 * @type {Object.<string, Array<DimensionKeyFamily>>}
 */
export const FAMILIES_BY_DIMENSION = Object.freeze(
	Object.fromEntries(
		DIMENSIONS.map(d => [d.name, DIMENSION_KEY_FAMILIES.filter(f => dimensionHasFamily(d, f))])
	)
);

/**
 * Whether each dimension's default scale measures unique values rather than a
 * min and max, keyed by dimension name.
 * @type {Object.<string, boolean>}
 */
export const DEFAULT_IS_ORDINAL = Object.freeze(
	Object.fromEntries(DIMENSIONS.map(d => [d.name, isOrdinalDomain(d.defaultScale())]))
);

/**
 * Every prop name the registry recognizes – drives the unknown-prop warning.
 * @type {Set<string>}
 */
export const VALID_DIMENSION_PROPS = new Set(
	DIMENSIONS.flatMap(d =>
		FAMILIES_BY_DIMENSION[d.name].filter(f => f.isProp === true).map(f => `${d.name}${f.suffix}`)
	)
);
