import { createContext } from 'svelte';

/**
 * The LayerCake context values: the static values plus every per-dimension
 * key (x, xScale, xGet etc.). Every `@property` line from `x` down to the
 * end of this comment is generated – edit the registry, then run
 * `pnpm generate:dims`. No fence markers by design; see
 * src/scripts/generateDimensionDocs.js.
 * @typedef {Object} LayerCakeContext
 * @property {Object.<string, Function>} activeGetters The accessor functions for every dimension the user set, keyed by dimension name.
 * @property {number} width The calculated chart width, i.e. the container width minus padding.
 * @property {number} height The calculated chart height, i.e. the container height minus padding.
 * @property {boolean} percentRange Whether scale ranges are set to `[0, 100]`.
 * @property {number} aspectRatio The chart's aspect ratio, width divided by height.
 * @property {number} containerWidth The measured container width.
 * @property {number} containerHeight The measured container height.
 * @property {Element|undefined} element The `.layercake-container` div.
 * @property {Object} custom Any extra values passed via the `custom` prop.
 * @property {Object|Array<Object>} data The chart data.
 * @property {{top: number, right: number, bottom: number, left: number}} padding The chart padding.
 * @property {Object|Array<any>} flatData The flat version of the data.
 * @property {Object.<string, Array<any>>} extents The measured extents keyed by dimension name.
 * @property {Object.<string, any>} config A read-only copy of the accessor, domain and range props the user set.
 * @property {Function|null} x The x accessor.
 * @property {Function|undefined} xScale The computed x scale.
 * @property {Function|undefined} xGet Runs a datum through the x accessor and scale.
 * @property {Array<any>|undefined} xDomain The x scale's domain, which may have been modified by `.nice()`.
 * @property {Array<any>|undefined} xRange The x scale's range.
 * @property {boolean|number} xNice Whether `.nice()` was applied to the x domain.
 * @property {[number, number]|undefined} xPadding The pixel padding applied to the x domain, as `[left, right]`.
 * @property {boolean} xReverse Whether the default x range is reversed.
 * @property {boolean} xDomainSort Whether the x domain's calculated unique values are sorted.
 * @property {Function|null} y The y accessor.
 * @property {Function|undefined} yScale The computed y scale.
 * @property {Function|undefined} yGet Runs a datum through the y accessor and scale.
 * @property {Array<any>|undefined} yDomain The y scale's domain, which may have been modified by `.nice()`.
 * @property {Array<any>|undefined} yRange The y scale's range.
 * @property {boolean|number} yNice Whether `.nice()` was applied to the y domain.
 * @property {[number, number]|undefined} yPadding The pixel padding applied to the y domain, as `[left, right]`.
 * @property {boolean} yReverse Whether the default y range is reversed.
 * @property {boolean} yDomainSort Whether the y domain's calculated unique values are sorted.
 * @property {Function|null} z The z accessor.
 * @property {Function|undefined} zScale The computed z scale.
 * @property {Function|undefined} zGet Runs a datum through the z accessor and scale.
 * @property {Array<any>|undefined} zDomain The z scale's domain, which may have been modified by `.nice()`.
 * @property {Array<any>|undefined} zRange The z scale's range.
 * @property {boolean|number} zNice Whether `.nice()` was applied to the z domain.
 * @property {[number, number]|undefined} zPadding The pixel padding applied to the z domain, as `[left, right]`.
 * @property {boolean} zReverse Whether the default z range is reversed.
 * @property {boolean} zDomainSort Whether the z domain's calculated unique values are sorted.
 * @property {Function|null} r The r accessor.
 * @property {Function|undefined} rScale The computed r scale.
 * @property {Function|undefined} rGet Runs a datum through the r accessor and scale.
 * @property {Array<any>|undefined} rDomain The r scale's domain, which may have been modified by `.nice()`.
 * @property {Array<any>|undefined} rRange The r scale's range.
 * @property {boolean} rNice Whether `.nice()` was applied to the r domain.
 * @property {[number, number]|undefined} rPadding The pixel padding applied to the r domain, as `[left, right]`.
 * @property {boolean} rReverse Whether the default r range is reversed.
 * @property {boolean} rDomainSort Whether the r domain's calculated unique values are sorted.
 * @property {Function|null} x1 The x1 accessor, for a scale nested inside the x scale such as in grouped column charts.
 * @property {Function|undefined} x1Scale The computed x1 scale.
 * @property {Function|undefined} x1Get Runs a datum through the x1 accessor and scale.
 * @property {Array<any>|undefined} x1Domain The x1 scale's domain.
 * @property {Array<any>|undefined} x1Range The x1 scale's range.
 * @property {boolean} x1DomainSort Whether the x1 domain's calculated unique values are sorted.
 * @property {Function|null} y1 The y1 accessor, for a scale nested inside the y scale such as in grouped bar charts.
 * @property {Function|undefined} y1Scale The computed y1 scale.
 * @property {Function|undefined} y1Get Runs a datum through the y1 accessor and scale.
 * @property {Array<any>|undefined} y1Domain The y1 scale's domain.
 * @property {Array<any>|undefined} y1Range The y1 scale's range.
 * @property {boolean} y1DomainSort Whether the y1 domain's calculated unique values are sorted.
 * @property {Function|null} c The c (color) accessor.
 * @property {Function|undefined} cScale The computed c scale.
 * @property {Function|undefined} cGet Runs a datum through the c accessor and scale.
 * @property {Array<any>|undefined} cDomain The c scale's domain.
 * @property {Array<any>|undefined} cRange The c scale's range.
 * @property {boolean} cDomainSort Whether the c domain's calculated unique values are sorted.
 * @property {Function|null} c1 The c1 accessor, for a second color-like scale such as opacity.
 * @property {Function|undefined} c1Scale The computed c1 scale.
 * @property {Function|undefined} c1Get Runs a datum through the c1 accessor and scale.
 * @property {Array<any>|undefined} c1Domain The c1 scale's domain.
 * @property {Array<any>|undefined} c1Range The c1 scale's range.
 * @property {boolean} c1DomainSort Whether the c1 domain's calculated unique values are sorted.
 */

/**
 * The LayerCake chart context. In a child component, call
 * `const c = getLayerCakeContext()` and read values as `c.width`,
 * `c.xGet(d)` etc. Property reads are reactive – avoid destructuring
 * outside of `$derived`, which would capture a stale snapshot.
 * @type {[() => LayerCakeContext, (context: LayerCakeContext) => LayerCakeContext]}
 */
export const [getLayerCakeContext, setLayerCakeContext] = createContext();
