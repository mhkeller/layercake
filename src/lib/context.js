import { createContext, getContext, hasContext } from 'svelte';

/**
 * A d3 scale: a function you call, with whatever methods that kind of scale
 * has, like `.ticks()` on a linear scale or `.bandwidth()` on a band scale.
 * The type is loose on purpose. Layer Cake hands back whichever scale you
 * passed in, so it can't know which methods exist. A strict union of every
 * d3 scale would make `k.xScale.ticks()` a type error until you checked which
 * scale you had. If you know the scale type in your own component, name it:
 * `@type {LayerCakeContext<{ x: import('d3-scale').ScaleBand<string> }>}`.
 * @typedef {{ (value: any): any, [key: string]: any }} Scale
 */

/**
 * The scale type for dimension `K`. If you named it in `S`, you get that type.
 * Otherwise you get the loose `Scale` above. This lets you type one dimension
 * strictly without naming all eight.
 *
 * `0 extends (1 & S)` looks odd but it is the standard way to ask "is S the
 * `any` type?". Without it, `any extends Record<K, infer T>` would make `T`
 * `unknown`. Then every scale on the default context would be `unknown` and
 * nothing would type-check.
 * @template S
 * @template {string} K
 * @typedef {0 extends (1 & S) ? Scale : (S extends Record<K, infer T> ? T : Scale)} ScaleFor
 */

/**
 * Your accessor prop after Layer Cake has turned it into a function. Call it
 * with a row of data and it returns that row's value. Only a top-level
 * function accessor gets the row index. Functions inside an array accessor
 * are called with the row alone.
 * @typedef {(d: any, i?: number) => any} Accessor
 */

/**
 * Runs a row of data through a dimension's accessor and then its scale, e.g.
 * `k.xGet(d)`. You get back whatever the scale returns, like a pixel position
 * or a color. Scale methods like `.ticks()` live on `k.xScale`.
 * @typedef {(d: any, i?: number) => any} Getter
 */

/**
 * The LayerCake context values: the static values plus every per-dimension
 * key (x, xScale, xGet etc.). The `@property` lines from `x` to the end of
 * this comment are generated. To change them, edit settings/dimensions.js or
 * the templates in src/scripts/generateDimensionDocs.js, then run
 * `pnpm generate:dims`.
 * @template [S=any] Optionally name your scale types, e.g. `{ x: ScaleBand<string> }`. Anything you leave out keeps the loose `Scale` type.
 * @template [TData=any] Optionally name your data's shape, e.g. `LayerCakeContext<any, MyRow[]>` for rows or `LayerCakeContext<any, FeatureCollection>` for a GeoJSON map.
 * @typedef {Object} LayerCakeContext
 * @property {number} width The calculated chart width, i.e. the container width minus padding.
 * @property {number} height The calculated chart height, i.e. the container height minus padding.
 * @property {boolean} percentRange Whether scale ranges are set to `[0, 100]`.
 * @property {number} aspectRatio The chart's aspect ratio, width divided by height.
 * @property {number} containerWidth The measured container width.
 * @property {number} containerHeight The measured container height.
 * @property {Element|undefined} element The `.layercake-container` div.
 * @property {Object} custom Any extra values passed via the `custom` prop.
 * @property {TData} data The chart data as you passed it in.
 * @property {{top: number, right: number, bottom: number, left: number}} padding The chart padding.
 * @property {TData|Array<any>} flatData The flat version of the data: the `flatData` prop when you set one, otherwise `data` itself.
 * @property {Object.<string, Array<any>>} extents The measured extents keyed by dimension name.
 * @property {Object.<string, any>} config A read-only copy of the accessor, domain and range props the user set.
 * @property {Accessor} x The x accessor. On a chart that never sets `x`, this is `null` at runtime.
 * @property {ScaleFor<S, 'x'>} xScale The computed x scale. On a chart that never sets `x`, this is `undefined` at runtime.
 * @property {Getter} xGet Runs a datum through the x accessor and scale. On a chart that never sets `x`, this is `undefined` at runtime.
 * @property {Array<any>} xDomain The x scale's domain, which may have been modified by `.nice()`. On a chart that never sets `x`, this is `undefined` at runtime.
 * @property {Array<any>} xRange The x scale's range. On a chart that never sets `x`, this is `undefined` at runtime.
 * @property {boolean|number} xNice Whether `.nice()` was applied to the x domain.
 * @property {[number, number]|undefined} xPadding The pixel padding applied to the x domain, as `[left, right]`.
 * @property {boolean} xReverse Whether the default x range is reversed.
 * @property {boolean} xDomainSort Whether the x domain's calculated unique values are sorted.
 * @property {Accessor} y The y accessor. On a chart that never sets `y`, this is `null` at runtime.
 * @property {ScaleFor<S, 'y'>} yScale The computed y scale. On a chart that never sets `y`, this is `undefined` at runtime.
 * @property {Getter} yGet Runs a datum through the y accessor and scale. On a chart that never sets `y`, this is `undefined` at runtime.
 * @property {Array<any>} yDomain The y scale's domain, which may have been modified by `.nice()`. On a chart that never sets `y`, this is `undefined` at runtime.
 * @property {Array<any>} yRange The y scale's range. On a chart that never sets `y`, this is `undefined` at runtime.
 * @property {boolean|number} yNice Whether `.nice()` was applied to the y domain.
 * @property {[number, number]|undefined} yPadding The pixel padding applied to the y domain, as `[left, right]`.
 * @property {boolean} yReverse Whether the default y range is reversed.
 * @property {boolean} yDomainSort Whether the y domain's calculated unique values are sorted.
 * @property {Accessor} z The z accessor. On a chart that never sets `z`, this is `null` at runtime.
 * @property {ScaleFor<S, 'z'>} zScale The computed z scale. On a chart that never sets `z`, this is `undefined` at runtime.
 * @property {Getter} zGet Runs a datum through the z accessor and scale. On a chart that never sets `z`, this is `undefined` at runtime.
 * @property {Array<any>} zDomain The z scale's domain, which may have been modified by `.nice()`. On a chart that never sets `z`, this is `undefined` at runtime.
 * @property {Array<any>} zRange The z scale's range. On a chart that never sets `z`, this is `undefined` at runtime.
 * @property {boolean|number} zNice Whether `.nice()` was applied to the z domain.
 * @property {[number, number]|undefined} zPadding The pixel padding applied to the z domain, as `[left, right]`.
 * @property {boolean} zReverse Whether the default z range is reversed.
 * @property {boolean} zDomainSort Whether the z domain's calculated unique values are sorted.
 * @property {Accessor} r The r accessor. On a chart that never sets `r`, this is `null` at runtime.
 * @property {ScaleFor<S, 'r'>} rScale The computed r scale. On a chart that never sets `r`, this is `undefined` at runtime.
 * @property {Getter} rGet Runs a datum through the r accessor and scale. On a chart that never sets `r`, this is `undefined` at runtime.
 * @property {Array<any>} rDomain The r scale's domain, which may have been modified by `.nice()`. On a chart that never sets `r`, this is `undefined` at runtime.
 * @property {Array<any>} rRange The r scale's range. On a chart that never sets `r`, this is `undefined` at runtime.
 * @property {boolean} rNice Whether `.nice()` was applied to the r domain.
 * @property {[number, number]|undefined} rPadding The pixel padding applied to the r domain, as `[left, right]`.
 * @property {boolean} rReverse Whether the default r range is reversed.
 * @property {boolean} rDomainSort Whether the r domain's calculated unique values are sorted.
 * @property {Accessor|null} x2 The x2 accessor, for a scale nested inside the x scale such as in grouped column charts.
 * @property {ScaleFor<S, 'x2'>|undefined} x2Scale The computed x2 scale.
 * @property {Getter|undefined} x2Get Runs a datum through the x2 accessor and scale.
 * @property {Array<any>|undefined} x2Domain The x2 scale's domain.
 * @property {Array<any>|undefined} x2Range The x2 scale's range.
 * @property {boolean} x2DomainSort Whether the x2 domain's calculated unique values are sorted.
 * @property {Accessor|null} y2 The y2 accessor, for a scale nested inside the y scale such as in grouped bar charts.
 * @property {ScaleFor<S, 'y2'>|undefined} y2Scale The computed y2 scale.
 * @property {Getter|undefined} y2Get Runs a datum through the y2 accessor and scale.
 * @property {Array<any>|undefined} y2Domain The y2 scale's domain.
 * @property {Array<any>|undefined} y2Range The y2 scale's range.
 * @property {boolean} y2DomainSort Whether the y2 domain's calculated unique values are sorted.
 * @property {Accessor|null} c The c (color) accessor.
 * @property {ScaleFor<S, 'c'>|undefined} cScale The computed c scale.
 * @property {Getter|undefined} cGet Runs a datum through the c accessor and scale.
 * @property {Array<any>|undefined} cDomain The c scale's domain.
 * @property {Array<any>|undefined} cRange The c scale's range.
 * @property {boolean} cDomainSort Whether the c domain's calculated unique values are sorted.
 * @property {Accessor|null} c2 The c2 accessor, for a second color-like scale such as opacity.
 * @property {ScaleFor<S, 'c2'>|undefined} c2Scale The computed c2 scale.
 * @property {Getter|undefined} c2Get Runs a datum through the c2 accessor and scale.
 * @property {Array<any>|undefined} c2Domain The c2 scale's domain.
 * @property {Array<any>|undefined} c2Range The c2 scale's range.
 * @property {boolean} c2DomainSort Whether the c2 domain's calculated unique values are sorted.
 */

/**
 * The LayerCake chart context. In a child component, call
 * `const k = getLayerCakeContext()` and read values as `k.width`,
 * `k.xGet(d)` etc. Each read is reactive. Don't destructure it outside of
 * `$derived`, or you'll get a copy that never updates.
 * @type {[() => LayerCakeContext, (context: LayerCakeContext) => LayerCakeContext]}
 */
export const [getLayerCakeContext, setLayerCakeContext] = createContext();

/**
 * A function that draws one layer on a `<Canvas>`. The context it gets is
 * already scaled for the screen and its origin sits at the top-left of the
 * chart area, the same origin Svg and Html children use, so it draws in chart
 * coordinates. Anything past the edges lands in the padding.
 * @typedef {(ctx: CanvasRenderingContext2D) => void} CanvasDrawFn
 */

/**
 * What `<Canvas>` hands its children. Get it with `getCanvasContext()`.
 * @typedef {Object} CanvasContext
 * @property {CanvasRenderingContext2D|null} ctx The 2d context for reading the canvas directly: a pixel under the pointer, `ctx.canvas.toDataURL()` and the like. `null` until the canvas mounts. Drawing goes through `draw`.
 * @property {(fn: CanvasDrawFn) => () => void} draw Gives Layer Cake a function that draws one layer. It runs on every repaint in the order components called `draw`. The function is dropped when the component is destroyed. Returns a function that drops it sooner. Call it at the top level of your component during setup.
 * @property {() => void} redraw Run the whole paint again, the same as after a resize: the canvas is cleared and every draw function on it is called, yours included. It happens at the end of the current tick. Several calls in one tick become one repaint. Only needed when a draw function reads something Svelte can't see change, such as an array you mutate in place or an image that finishes loading later. Props, `$state` and `k.*` values repaint on their own.
 */

/**
 * The context of the nearest parent `<Canvas>` layout.
 * @returns {CanvasContext}
 */
export function getCanvasContext() {
	if (!hasContext('canvas')) {
		throw new Error(
			'[LayerCake] getCanvasContext() only works in a component inside a <Canvas> layout'
		);
	}
	return getContext('canvas');
}
