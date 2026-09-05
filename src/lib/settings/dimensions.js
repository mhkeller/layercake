/**
 * What Layer Cake knows about its dimensions, written down as data.
 *
 * Two tables do the work. `DIMENSIONS` lists the eight dimensions and what
 * makes each one different: its default scale, its default range and whether
 * `percentRange` applies to it. `DIMENSION_KEY_FAMILIES` lists the suffixes
 * every dimension repeats, turning `x` into `xDomain`, `xScale`, `xRange` and
 * the rest.
 *
 * Everything else is built by looping over those two: the component's props,
 * the context keys children read, the published types and the guide's
 * per-dimension sections. So adding a dimension means adding an entry here and
 * running `pnpm generate:dims`. There is no second place to update.
 */
import { scaleLinear, scaleSqrt, scaleBand, scaleOrdinal } from 'd3-scale';

import hasBandwidth from '../utils/hasBandwidth.js';
import nestedRange from '../helpers/nestedRange.js';

/**
 * The values a range function receives. That's both the defaults below and any
 * `[name]Range` function the user passes. Built per dimension in
 * createScale.js. Every property is a getter, so a range only reruns when a
 * value it actually read changes.
 * @typedef {Object} DimensionRangeContext
 * @property {number} width The calculated chart width, i.e. the container width minus padding.
 * @property {number} height The calculated chart height, i.e. the container height minus padding.
 * @property {boolean} percentRange Whether the chart's ranges are in percent instead of pixels.
 * @property {number} rangeWidth The chart's width in the units ranges are measured in: `100` when `percentRange` is on, the pixel `width` otherwise.
 * @property {number} rangeHeight The chart's height in the units ranges are measured in: `100` when `percentRange` is on, the pixel `height` otherwise.
 * @property {Object.<string, any>} scales The other dimensions' computed scales, e.g. `scales.x`. This dimension's own scale isn't here. The range is being computed to build that scale, so reading it would be circular.
 */

/**
 * @typedef {Object} Dimension
 * @property {string} name The dimension's name. Its props are derived from it, e.g. `x` -> `xScale`, `xDomain`...
 * @property {string} [parent] The dimension this one nests inside by default, e.g. `x2` nests in `x`. Read by the doc generator and by the nested default range.
 * @property {boolean} [isPrimary] Whether this is one of the main x/y/z/r dimensions. The doc generator gives these the full prop descriptions and types their context keys as always present. See generateDimensionDocs.js.
 * @property {Function} defaultScale The D3 scale function to call when the user doesn't pass a `[name]Scale` prop, e.g. `scaleLinear`.
 * @property {(ctx: DimensionRangeContext) => Array<any>} defaultRange Returns the default range.
 * @property {(ctx: { scale: any }) => boolean} [defaultReverse] Works out the default for `[name]Reverse` from the user's scale prop, if any. Only used when the dimension supports reverse and the user didn't set the prop.
 * @property {boolean} canBePercentRange Whether the `percentRange` prop applies to this dimension and swaps its default range for `[0, 100]`. That only makes sense for ranges measured against the container. `x2` and `y2` measure against a band and `c` and `c2` are colors, so it's off for them.
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
 * Every dimension Layer Cake knows about. Anything that differs between
 * dimensions lives here as data. The code that reads these entries is the same
 * for all of them.
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
		// Unless the user says otherwise, flip the y range so values grow upward
		// from the bottom. Band scales are the exception. Their categories should
		// read top to bottom.
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
		// measure. `rangeWidth` is already in percent when `percentRange` is on,
		// so the fallback matches the units of every other range on the chart.
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
 * Every kind of key a dimension can have. Each suffix applies across the
 * dimensions, forming keys such as `xDomain`, `yDomain` and `cDomain`. The
 * Props typedef, the context keys, the `config` object and the unknown-prop
 * warning are all built from this table.
 * @type {Array<DimensionKeyFamily>}
 */
export const DIMENSION_KEY_FAMILIES = [
	// `stateKey` is spelled out on each row so you can match it against
	// state/dimension.svelte.js by eye
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
	// Every dimension supports DomainSort, so it doesn't need a feature flag
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
 * @param {Dimension} dimension The dimension's entry in the registry.
 * @param {DimensionKeyFamily} family The key family.
 * @returns {boolean}
 */
function dimensionHasFamily(dimension, family) {
	if (family.appliesToAllDimensions === true) return true;
	// `features` has a fixed set of keys so a typo in an entry above is a compile
	// error. This lookup builds the key at runtime, so loosen the type for this
	// one read.
	const features = /** @type {Object.<string, boolean|undefined>} */ (dimension.features);
	return features[family.stateKey] === true;
}

/**
 * The key families each dimension supports, keyed by dimension name. Computed
 * once, since both tables never change. To ask "does x2 have Nice?", check
 * whether the family is in `FAMILIES_BY_DIMENSION.x2`.
 * @type {Object.<string, Array<DimensionKeyFamily>>}
 */
export const FAMILIES_BY_DIMENSION = Object.freeze(
	Object.fromEntries(
		DIMENSIONS.map(d => [d.name, DIMENSION_KEY_FAMILIES.filter(f => dimensionHasFamily(d, f))])
	)
);

/**
 * Every prop name these two tables define. The unknown-prop warning checks against this.
 * @type {Set<string>}
 */
export const VALID_DIMENSION_PROPS = new Set(
	DIMENSIONS.flatMap(d =>
		FAMILIES_BY_DIMENSION[d.name].filter(f => f.isProp === true).map(f => `${d.name}${f.suffix}`)
	)
);
