/// <reference types="@sveltejs/kit" />

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

type D3ScaleConstructor<Domain = any, Range = any> =
	| (() => D3Scale<Domain, Range>);

interface D3Scale<Domain = any, Range = any> {
	(value: Domain): Range;
	domain(): Domain[];
	domain(domain: Domain[]): this;
	range(): Range[];
	range(range: Range[]): this;
	copy?(): D3Scale<Domain, Range>;
	// Optional methods that many scales have
	clamp?(): boolean;
	clamp?(clamp: boolean): this;
	nice?(): this;
	ticks?(): Domain[];
	tickFormat?(): (d: Domain) => string;
	// Band/Point scale methods
	bandwidth?(): number;
	step?(): number;
}

type D3ScaleOrConstructor<Domain = any, Range = any> =
	| D3Scale<Domain, Range>
	| D3ScaleConstructor<Domain, Range>

