/**
	Filters a list for every n entries
  useful for slimming down the number of ticks
  in an axis
	@param {Array} list A list of items
	@param {Number} n Take one item every n times. So if you set this to 5, every fifth element will be taken, including the 0th.
	@returns {Array}
*/
export default function takeEvery(list, n) {
  if (list.length <= n) return list;
  const e = Math.round(list.length / n);
  return list.filter((d, i) => {
    return i % e === 0;
  });
}
