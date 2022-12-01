import type { Accessor, SimpleAccessor, StackedAccessor } from "./utils/makeAccessor"


export interface LayerCakeConfig<
	Datum,
	XAccessor extends Accessor<Datum> = Accessor<Datum>,
	YAccessor extends Accessor<Datum> = Accessor<Datum>,
	ZAccessor extends Accessor<Datum> = Accessor<Datum>,
	RAccessor extends Accessor<Datum> = Accessor<Datum>,
> {
	x: XAccessor
	y: YAccessor
	z: ZAccessor
	r: RAccessor
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

/**
 * A helper type that constrains the {@linkcode LayerCakeConfig}
 * to only use accessors that return a number (no stacks).
 */
export type LayerCakeConfigSimple<Datum,
	XAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>,
	YAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>,
	ZAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>,
	RAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>
> = LayerCakeConfig<Datum, XAccessor, YAccessor, ZAccessor, RAccessor>

/**
 * A helper type that constrains the {@linkcode LayerCakeConfig}
 * to only use accessors that return a number for Y, Z and R, but
 * constrain X to be a stack accessor.
 */
export type LayerCakeConfigXStacked<Datum extends readonly any[],
	XAccessor extends Datum extends readonly (infer SubDatum)[] ? StackedAccessor<SubDatum> : never = Datum extends readonly (infer SubDatum)[] ? StackedAccessor<SubDatum> : never,
	YAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>,
	ZAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>,
	RAccessor extends SimpleAccessor<Datum> = SimpleAccessor<Datum>
> = LayerCakeConfig<Datum, XAccessor, YAccessor, ZAccessor, RAccessor>
