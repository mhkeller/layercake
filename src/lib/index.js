export { default as LayerCake } from './LayerCake.svelte';
export { getLayerCakeContext, setLayerCakeContext, getCanvasContext } from './context.js';

/**
 * The context type, exported so you can name it in your own layer components,
 * e.g. `@param {import('layercake').LayerCakeContext} k`. The `@template` lines
 * are repeated here on purpose. A plain re-export would drop them. Then
 * `LayerCakeContext<{ x: ScaleBand<string> }>` would not compile outside this
 * package.
 * @template [S=any]
 * @template [TData=any]
 * @typedef {import('./context.js').LayerCakeContext<S, TData>} LayerCakeContext
 */

/**
 * The prop and scale types, exported for the same reason. A component that
 * takes an accessor of its own can say `@type {import('layercake').DataAccessor}`.
 * `Scale` is the loose d3 scale type the context hands back. See context.js for
 * why it's loose and how to tighten it.
 * @typedef {import('./types.js').DataAccessor} DataAccessor
 * @typedef {import('./types.js').DimensionDomain} DimensionDomain
 * @typedef {import('./types.js').DimensionRange} DimensionRange
 * @typedef {import('./context.js').Scale} Scale
 */

/**
 * The canvas context and the draw function it takes, for typing your own
 * canvas layers: `@type {import('layercake').CanvasDrawFn}`.
 * @typedef {import('./context.js').CanvasContext} CanvasContext
 * @typedef {import('./context.js').CanvasDrawFn} CanvasDrawFn
 */
export { default as Html } from './layouts/Html.svelte';
export { default as Svg } from './layouts/Svg.svelte';
export { default as ScaledSvg } from './layouts/ScaledSvg.svelte';
export { default as Canvas } from './layouts/Canvas.svelte';
export { default as WebGL } from './layouts/Webgl.svelte';

export { default as scaleCanvas } from './lib/scaleCanvas.js';
export { default as flatten } from './lib/flatten.js';
export { default as uniques } from './lib/uniques.js';
export { default as calcExtents } from './lib/calcExtents.js';
export { default as raise } from './lib/raise.js';
export { default as takeEvery } from './lib/takeEvery.js';
export { default as bin } from './lib/bin.js';
export { default as stack } from './lib/stack.js';
export { default as groupLonger } from './lib/groupLonger.js';
