export { default as LayerCake } from './LayerCake.svelte';
export { getLayerCakeContext, setLayerCakeContext } from './context.js';

/**
 * Re-exported so consumers can name the context type when they write their own
 * layer components, e.g. `@param {import('layercake').LayerCakeContext} c`. The
 * `@template` lines have to be repeated here – a bare re-export would drop the
 * parameters and `LayerCakeContext<{ x: ScaleBand<string> }>` would stop
 * compiling for anyone outside this package.
 * @template [S=any]
 * @template [TData=any]
 * @typedef {import('./context.js').LayerCakeContext<S, TData>} LayerCakeContext
 */

/**
 * The same for the prop shapes. A component that takes an accessor of its own
 * can say `@type {import('layercake').DataAccessor}` instead of copying the
 * union out of the docs. `Scale` is the loose d3-scale type the context hands
 * back – see context.js for why it stays loose and how to tighten it.
 * @typedef {import('./types.js').DataAccessor} DataAccessor
 * @typedef {import('./types.js').DimensionDomain} DimensionDomain
 * @typedef {import('./types.js').DimensionRange} DimensionRange
 * @typedef {import('./context.js').Scale} Scale
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
