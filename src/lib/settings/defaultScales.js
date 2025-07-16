import { scaleLinear, scaleSqrt } from 'd3-scale';

/** @type {{x: D3ScaleConstructor, y: D3ScaleConstructor, z: D3ScaleConstructor, r: D3ScaleConstructor}} DefaultScales
 */

export default {
	x: scaleLinear,
	y: scaleLinear,
	z: scaleLinear,
	r: scaleSqrt
};
