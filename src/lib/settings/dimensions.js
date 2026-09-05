/**
 * What Layer Cake knows about its dimensions, written down as data.
 *
 * Two tables do the work. `DIMENSIONS` lists the eight dimensions and what
 * makes each one different – its default scale, its default range, whether
 * `percentRange` reaches it. `DIMENSION_KEY_FAMILIES` lists the suffixes every
 * dimension repeats, turning `x` into `xDomain`, `xScale`, `xRange` and the
 * rest.
 *
 * Everything downstream is built by looping over those two: the component's
 * props, the context keys children read, the published types and the guide's
 * per-dimension sections. So adding a dimension means adding an entry here and
 * running `pnpm generate:dims` – there is no second place to update.
 */
import { scaleLinear, scaleSqrt, scaleBand, scaleOrdinal } from 'd3-scale';

import hasBandwidth from '../utils/hasBandwidth.js';
import nestedRange from '../helpers/nestedRange.js';

/**
 * The values available to a dimension's range function – the defaults below and
 * user-passed `[name]Range` functions alike. Built per dimension in
 * createScale.js, and every property is a lazy getter, so a range only depends
 * on the values it actually reads.
 * @typedef {Object} DimensionRangeContext
 * @property {number} width The calculated chart width, i.e. the container width minus padding.
 * @property {number} height The calculated chart height, i.e. the container height minus padding.
 * @property {boolean} percentRange Whether the container-relative dimensions are measuring in percent rather than pixels.
 * @property {number} rangeWidth The chart's width in the units ranges are measured in: `100` when `percentRange` is on, the pixel `width` otherwise.
 * @property {number} rangeHeight The chart's height in the units ranges are measured in: `100` when `percentRange` is on, the pixel `height` otherwise.
 * @property {Object.<string, any>} scales The computed scales of sibling dimensions, e.g. `scales.x`. The dimension's own scale is deliberately absent – a range helps build that scale, so reading it back would be circular.
 */

/**
 * @typedef {Object} Dimension
 * @property {string} name The dimension's name. Its props are derived from it, e.g. `x` -> `xScale`, `xDomain`...
 * @property {string} [parent] The dimension this one nests inside by default, e.g. `x2` nests in `x`. Read by the doc generator and by the nested default range.
 * @property {boolean} [isPrimary] Whether docs describe this dimension with the full classic x/y/z/r prose rather than the shorter secondary-dimension prose. Also decides which context keys drop their `|undefined` type (see generateDimensionDocs.js).
 * @property {Function} defaultScale An uninstantiated D3 scale factory used when the user doesn't pass a `[name]Scale` prop.
 * @property {(ctx: DimensionRangeContext) => Array<any>} defaultRange Returns the default range.
 * @property {(ctx: { scale: any }) => boolean} [defaultReverse] Dynamic default for `[name]Reverse`, receiving the user-passed scale prop (or undefined). Only consulted when the feature is enabled and the user didn't set the prop.
 * @property {boolean} canBePercentRange Whether the global `percentRange` prop applies to this dimension, replacing its default range with `[0, 100]`. Only sensible for spatial, container-relative ranges – bandwidth-based (`x2`, `y2`) and color (`c`, `c2`) ranges opt out.
 * @property {{ nice?: boolean, padding?: boolean, reverse?: boolean }} features Enables the key families that don't apply to every dimension (`Nice`, `Padding`, `Reverse`), keyed by the family's `stateKey`. The accessor, `Domain`, `Scale`, `Range`, `Get` and `DomainSort` apply to every dimension and need no entry.
 */

/** The full feature set, shared by x, y, z and r. */
const ALL_FEATURES = Object.freeze({ nice: true, padding: true, reverse: true });

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
 * Every dimension Layer Cake knows about. All per-dimension
 * behavior differences live here as data – the code paths that consume these
 * entries are identical for every dimension.
 * @type {Array<Dimension>}
 */
export const DIMENSIONS = [
	{
		name: 'x',
		isPrimary: true,
		defaultScale: scaleLinear,
		defaultRange: ctx => [0, ctx.width],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'y',
		isPrimary: true,
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
		isPrimary: true,
		defaultScale: scaleLinear,
		defaultRange: ctx => [0, ctx.width],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'r',
		isPrimary: true,
		defaultScale: scaleSqrt,
		defaultRange: () => [1, 25],
		canBePercentRange: true,
		features: ALL_FEATURES
	},
	{
		name: 'x2',
		parent: 'x',
		defaultScale: scaleBand,
		// One band of the parent scale, or the whole chart when x has no bands to
		// measure. `rangeWidth` already accounts for percent mode, so the
		// fallback lands in the same units as every other range on the chart.
		defaultRange: ctx => nestedRange(ctx.scales.x, ctx.rangeWidth),
		canBePercentRange: false,
		features: {}
	},
	{
		name: 'y2',
		parent: 'y',
		defaultScale: scaleBand,
		defaultRange: ctx => nestedRange(ctx.scales.y, ctx.rangeHeight),
		canBePercentRange: false,
		features: {}
	},
	{
		name: 'c',
		defaultScale: scaleOrdinal,
		defaultRange: () => [...CATEGORICAL_COLORS],
		canBePercentRange: false,
		features: {}
	},
	{
		name: 'c2',
		defaultScale: scaleLinear,
		defaultRange: () => [0, 1],
		canBePercentRange: false,
		features: {}
	}
];

/**
 * @typedef {Object} DimensionKeyFamily
 * @property {string} suffix Appended to the dimension name to form the prop and context key, e.g. `x` + `Domain` -> `xDomain`. The empty string is the accessor itself.
 * @property {string} stateKey The key on the dimension state object (see `state/dimension.svelte.js`) holding this family's computed value.
 * @property {boolean} isProp Whether users can pass this family as a component prop. Only `Get` can't be – it is computed, so it exists solely on the context.
 * @property {boolean} appliesToAllDimensions Whether the family applies to every dimension. Families that don't are enabled per dimension in its `features` object, looked up by the family's `stateKey`.
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
	// `stateKey` is written out per row rather than computed from the
	// suffix, so this table reads exactly like the state object it maps to
	{
		suffix: '',
		stateKey: 'accessor',
		isProp: true,
		appliesToAllDimensions: true,
		addToConfig: true
	},
	{
		suffix: 'Domain',
		stateKey: 'domain',
		isProp: true,
		appliesToAllDimensions: true,
		addToConfig: true
	},
	{
		suffix: 'Scale',
		stateKey: 'scale',
		isProp: true,
		appliesToAllDimensions: true,
		addToConfig: false
	},
	{
		suffix: 'Range',
		stateKey: 'range',
		isProp: true,
		appliesToAllDimensions: true,
		addToConfig: true
	},
	{
		suffix: 'Get',
		stateKey: 'get',
		isProp: false,
		appliesToAllDimensions: true,
		addToConfig: false
	},
	{
		suffix: 'Nice',
		stateKey: 'nice',
		isProp: true,
		appliesToAllDimensions: false,
		addToConfig: false
	},
	{
		suffix: 'Padding',
		stateKey: 'padding',
		isProp: true,
		appliesToAllDimensions: false,
		addToConfig: false
	},
	{
		suffix: 'Reverse',
		stateKey: 'reverse',
		isProp: true,
		appliesToAllDimensions: false,
		addToConfig: false
	},
	// DomainSort applies to every dimension, so it lives here rather than
	// in each entry's `features`
	{
		suffix: 'DomainSort',
		stateKey: 'domainSort',
		isProp: true,
		appliesToAllDimensions: true,
		addToConfig: false
	}
];

/**
 * Whether a dimension supports a key family.
 * @param {Dimension} dimension The dimension's definition – its name, default scale and so on.
 * @param {DimensionKeyFamily} family The key family.
 * @returns {boolean}
 */
function dimensionHasFamily(dimension, family) {
	if (family.appliesToAllDimensions === true) return true;
	// `features` has a fixed set of keys so a typo in an entry above fails to
	// compile. This
	// lookup uses the family's stateKey at runtime, so widen the type just for
	// this read.
	const features = /** @type {Object.<string, boolean|undefined>} */ (dimension.features);
	return features[family.stateKey] === true;
}

/**
 * The key families each dimension supports, keyed by dimension name.
 * Computed once – both tables are static. This map is the one public answer to
 * "does x2 have Nice?" – check membership on it.
 * @type {Object.<string, Array<DimensionKeyFamily>>}
 */
export const FAMILIES_BY_DIMENSION = Object.freeze(
	Object.fromEntries(
		DIMENSIONS.map(d => [d.name, DIMENSION_KEY_FAMILIES.filter(f => dimensionHasFamily(d, f))])
	)
);

/**
 * Every prop name these two tables define – drives the unknown-prop warning.
 * @type {Set<string>}
 */
export const VALID_DIMENSION_PROPS = new Set(
	DIMENSIONS.flatMap(d =>
		FAMILIES_BY_DIMENSION[d.name].filter(f => f.isProp === true).map(f => `${d.name}${f.suffix}`)
	)
);
