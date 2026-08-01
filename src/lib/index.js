export { default as LayerCake } from './LayerCake.svelte';
export { getLayerCakeContext, setLayerCakeContext } from './context.js';

/**
 * Re-exported so consumers can name the context type when they write their own
 * layer components, e.g. `@param {import('layercake').LayerCakeContext} c`.
 * @typedef {import('./context.js').LayerCakeContext} LayerCakeContext
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
