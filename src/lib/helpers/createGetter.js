export default function createGetter ([$acc, $scale]) {
	return (d, i) => {
		const val = $acc(d, i);
		if (Array.isArray(val)) {
			return val.map(v => $scale(v));
		}
		return $scale(val);
	};
}
