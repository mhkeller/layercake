import { scaleLinear, scaleSqrt } from 'd3-scale';

/** @type {{x: D3ScaleOrConstructor, y: D3ScaleOrConstructor, z: D3ScaleOrConstructor, r: D3ScaleOrConstructor}} DefaultScales
 */

export default {
	x: scaleLinear,
	y: scaleLinear,
	z: scaleLinear,
	r: scaleSqrt
};
