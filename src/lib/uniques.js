export default function uniques (list, iteratee, transform = true) {
	if (!Array.isArray(list)) {
		console.error('LayerCake error: Input value to `uniques` must be a list.');
		return null;
	};
	const ll = list.length;
	const iterater = typeof iteratee === 'function';
	const key = typeof iteratee !== 'undefined';
	const seen = [];
	const result = [];
	for (let i = 0; i < ll; i++) {
		const d = list[i];
		const computed = iterater ? iteratee(d) : key === true ? d[iteratee] : d;
		if (!seen.includes(computed)) {
			seen.push(computed);
			if (transform === false) {
				result.push(d);
			}
		}
	}
	return transform === false ? result : seen;
}
