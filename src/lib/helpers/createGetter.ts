import type { AccessorFunction } from "$lib/utils/makeAccessor";

export default function createGetter<
	Datum,
	Acc extends AccessorFunction<Datum, number> | AccessorFunction<Datum, number[]>
>(
	[$acc, $scale]: [accessor: Acc, scale: (number) => number]
): Acc;
export default function createGetter<
	Datum,
	Acc extends AccessorFunction<Datum, number> | AccessorFunction<Datum, number[]>
>(
	[$acc, $scale]: [accessor: Acc, scale: (number) => number]
): AccessorFunction<Datum, number | number[]> {
	return (d: Datum) => {
		const val = $acc(d);
		if (Array.isArray(val)) {
			return val.map(v => $scale(v)) as number[] | number;
		}
		return $scale(val);
	};
}
