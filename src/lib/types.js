/**
 * The prop shapes that repeat across every dimension. `x`, `y` and `c` all take
 * the same kind of accessor, and every `*Domain` and `*Range` prop takes the
 * same kind of value, so those three shapes are named once here instead of
 * being spelled out forty-odd times in the `Props` typedef.
 *
 * They are re-exported from the package root, so in your own components you can
 * write `@type {import('layercake').DataAccessor}` rather than repeating the
 * union. The guide explains each one under
 * [Prop types](/guide#prop-types).
 */

/**
 * How you point Layer Cake at a field in your data.
 *
 * - a string looks up that key on each row
 * - a function is called with the row and returns the value
 * - a number is used as the value itself, handy for a constant
 * - an array does any mix of the above and gives you back an array, which is
 *   what stacked and multi-series charts pass
 *
 * @typedef {string|Function|number|Array<string|Function|number>|undefined} DataAccessor
 */

/**
 * What you can set a scale's domain to.
 *
 * - `[min, max]`, where either end can be `null` to keep the value measured
 *   from the data
 * - a list of values for ordinal scales, or more than two numbers for a
 *   [piecewise](https://github.com/d3/d3-scale#continuous_domain) scale
 * - a function, which receives the measured domain and returns a replacement –
 *   the usual way to sort one
 *
 * @typedef {[min: number|null, max: number|null]|Array<string|number>|Function|undefined} DimensionDomain
 */

/**
 * What you can set a scale's range to.
 *
 * - `[min, max]` in pixels
 * - a list of discrete outputs, such as the colors of a `cRange`
 * - a function receiving `({ width, height, scales })` that returns either of
 *   those, so a range can be sized off the chart or off a sibling scale
 *
 * @typedef {[min: number, max: number]|Function|Array<string|number>|undefined} DimensionRange
 */

export {};
