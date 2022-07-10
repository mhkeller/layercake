/* --------------------------------------------
 *
 * Filter a list for every n entries
 * useful for slimming down the number of ticks
 * in an axis
 *
 * --------------------------------------------
 */
export default function everyN(list, n) {
	if (list.length <= n) return list;
	const e = Math.round(list.length / n);
	return list.filter((d, i) => {
		return i % e === 0;
	});
}
