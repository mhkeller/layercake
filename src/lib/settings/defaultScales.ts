import type { Axis } from '../helpers/axes';
import { scaleLinear, scaleSqrt } from 'd3-scale';

export default {
	x: scaleLinear,
	y: scaleLinear,
	z: scaleLinear,
	r: scaleSqrt
} as const satisfies Record<Axis, any>;
