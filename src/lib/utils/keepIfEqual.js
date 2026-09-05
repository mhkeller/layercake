/**
 * Return `prev` when `next` holds the same values in the same order.
 * d3 returns a fresh array every time you call `.domain()` or `.range()`. So
 * every resize would give `k.xDomain` a new array even when the values didn't
 * change. Anything in a child that depends on it would rerun for nothing.
 *
 * Order matters here. `[0, 100]` and `[100, 0]` are different ranges, so this
 * can't use `arraysEqual`, which ignores order.
 * @param {Array<any>|null|undefined} prev The array from last time.
 * @param {Array<any>|null|undefined} next The fresh read. Anything that isn't an array is returned as is. getRange returns `null` for a scale with no range.
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
