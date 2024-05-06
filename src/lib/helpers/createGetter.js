export default function createGetter([$acc, $scale]) {
	return (d) => {
		const val = $acc(d);
		if (Array.isArray(val)) {
			return val.map((v) => $scale(v));
		}
		return $scale(val);
	};
}
