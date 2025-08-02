/// <reference types="@sveltejs/kit" />
/// <reference types="@d3" />

declare module '*.csv';

type DataAccessor =
	| string
	| Function
	| number
	| Array<string | Function | number>
	| undefined
	| null;

type DimensionDomain =
	| [min: number | null, max: number | null]
	| Array<string | number>
	| Function
	| undefined;

type DimensionRange = [min: number, max: number] | Function | Array<string | number> | undefined;

type AnyD3Scale =
	| ScaleContinuousNumeric<any, any>
	| ScaleOrdinal<any, any>
	| ScaleTime<any, any>
	| ScaleLinear<any, any>
	| ScalePower<any, any>
	| ScaleLogarithmic<any, any>
	| ScaleSymlog<any, any>
	| ScaleQuantile<any, any>
	| ScaleQuantize<any, any>
	| ScaleThreshold<any, any>
	| ScaleSequential<any, any>
	| ScaleDiverging<any, any>;

type D3ScaleConstructor<Domain = any, Range = any> = () => AnyD3Scale<Domain, Range>;

type D3ScaleOrConstructor<Domain = any, Range = any> =
	| AnyD3Scale<Domain, Range>
	| D3ScaleConstructor<Domain, Range>;
