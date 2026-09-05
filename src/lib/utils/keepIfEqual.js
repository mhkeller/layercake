/**
 * Return `prev` when `next` holds the same values in the same order.
 * d3 hands back a fresh array copy on every `.domain()`/`.range()` read, so a
 * rebuilt scale with unchanged values would give `k.xDomain` a new identity on
 * every resize tick and children's `$derived`s could never bail out.
 *
 * Order matters – `[0, 100]` and `[100, 0]` are different ranges – so this is
 * deliberately not the order-insensitive `arraysEqual`.
 * @param {Array<any>|null|undefined} prev
 * @param {Array<any>|null|undefined} next The fresh read. Non-arrays pass through – getRange reports a scale with no measurable range as `null`.
 * @returns {Array<any>|null|undefined}
 */
export default function keepIfEqual(prev, next) {
	if (
		Array.isArray(prev) &&
		Array.isArray(next) &&
		prev.length === next.length &&
		next.every((value, i) => value === prev[i])
	) {
		return prev;
	}
	return next;
}
