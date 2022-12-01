import type { Accessor } from "./utils/makeAccessor"


export interface LayerCakeConfig<Datum> {
	x: Accessor<Datum>
	y: Accessor<Datum>
	z: Accessor<Datum>
	r: Accessor<Datum>
	// TODO
	xDomain: unknown
	yDomain: unknown
	zDomain: unknown
	rDomain: unknown
	xRange: unknown
	yRange: unknown
	zRange: unknown
	rRange: unknown
}
