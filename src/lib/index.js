/**
 * Configured and computed properties to use
 * @typedef {import('svelte/types/runtime/store').Writable} Writable
 * @typedef {import('svelte/types/runtime/store').Readable} Readable
 * @typedef {Object} LayerCakeContext
 * @property {Readable<Function>} x x whatever
 * @property {Function} y a thing called y
 */

export { default as LayerCake } from './LayerCake.svelte';
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
