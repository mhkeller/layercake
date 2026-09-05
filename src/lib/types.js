/**
 * The three value shapes every dimension prop uses: the accessor, the domain
 * and the range. `x`, `y`, `c` and the rest all take the same kind of accessor.
 * The same goes for every `*Domain` and `*Range` prop.
 *
 * They are exported from the package root, so in your own components you can
 * write `@type {import('layercake').DataAccessor}`. The guide explains each one
 * under [Prop types](/guide#prop-types).
 */

/**
 * How you point Layer Cake at a field in your data.
 *
 * - a string looks up that key on each row
 * - a function is called with the row (and, outside of array form, the row's
 *   index) and returns the value
 * - a number looks up that index or key on each row, the same as a string.
 *   For a constant, pass a function instead, e.g. `r={() => 5}`
 * - an array does any mix of the above and gives you back an array, which is
 *   what stacked and multi-series charts pass
 *
 * @typedef {string|number|((d: any, i?: number) => any)|Array<string|number|((d: any) => any)>|undefined} DataAccessor
 */

/**
 * What you can set a scale's domain to.
 *
 * - `[min, max]`, where either end can be `null` to keep the value measured
 *   from the data
 * - a list of values for ordinal scales, or more than two numbers for a
 *   [piecewise](https://github.com/d3/d3-scale#continuous_domain) scale
 * - a function that receives the measured domain and returns a new one. This
 *   is how you sort a domain
 *
 * @typedef {[min: number|null, max: number|null]|Array<string|number|null>|((domain: Array<any>) => Array<any>)|undefined} DimensionDomain
 */

/**
 * What you can set a scale's range to.
 *
 * - `[min, max]` in pixels
 * - a list of discrete outputs, such as the colors of a `cRange`
 * - a function receiving the chart's measurements, which
 *   [DimensionRangeContext](./settings/dimensions.js) lists, so a range can be
 *   sized off the chart or off a sibling scale
 *
 * @typedef {[min: number, max: number]|Array<string|number>|((ctx: import('./settings/dimensions.js').DimensionRangeContext) => Array<any>)|undefined} DimensionRange
 */

export {};
