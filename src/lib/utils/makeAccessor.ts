import canBeZero from './canBeZero.js';

/**
	Make an accessor from a string, number, function or an array of the combination of any.

	@param acc The accessor function, key or list of them.
	@returns An accessor function.
*/
export default function makeAccessor<Datum>(acc: SimpleAccessor<Datum>): AccessorFunction<Datum, number>;
export default function makeAccessor<Datum>(acc: Accessor<Datum>): AccessorFunction<Datum, number> | AccessorFunction<Datum, number[]>;
export default function makeAccessor<Datum>(acc: Accessor<Datum>): AccessorFunction<Datum, number> | AccessorFunction<Datum, number[]> {
	if (!canBeZero(acc)) return null;
	if (Array.isArray(acc)) {
		return d => acc.map((k) => {
			return typeof k === 'function' ? k(d) : (d[k]);
		});
	} else if (typeof acc !== 'function') {
		// @ts-expect-error: TypeScript cannot infer that `acc` can index `d` here.
		return d => d[acc];
	}
	return acc;
}

export type AccessorFunction<Datum, Out = number> = ((d: Datum) => Out)

/** A key, an index, or a function that yields a number. */
type SimpleAccessor<Datum> = (KeysWithValueMatchingType<Datum, number> | AccessorFunction<Datum>)
type StackedAccessor<SubDatum> =
	| (KeysWithValueMatchingType<SubDatum, number>
		| AccessorFunction<SubDatum>)[]

/** A string, an accessor function, or a number to access `Datum`. */
export type Accessor<Datum> =
	| (Datum extends readonly (infer SubDatum)[]
		? (StackedAccessor<SubDatum> | SimpleAccessor<Datum>)
		: SimpleAccessor<Datum>)

/**
 * An {@linkcode Accessor} or an array of
 * any combination of {@linkcode Accessor | Accessors}.
 */
// export type AccessorArray<Datum, Out extends number[] | number> =

/** Select all keys/indices in `T` that map to a value of type `Match` */
export type KeysWithValueMatchingType<T, Match> = keyof T & (T extends Match[]
	? number
	: T extends readonly Match[]
	? Exclude<Partial<T>["length"], T["length"]>
	: T extends Record<any, unknown>
	? { [K in keyof T]: T[K] extends Match ? K : never }[keyof T]
	: never);
