export default function calcThresholds(domain = [0, 1], n) {
	const breaks = [domain[0]];
	const brk = (domain[1] - domain[0]) / n;
	while (breaks[breaks.length - 1] < domain[1]) {
		const node = breaks[breaks.length - 1] + brk;
		breaks.push(node);
	}
	return breaks;
}
