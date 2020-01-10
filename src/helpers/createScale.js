import defaultScales from '../settings/defaultScales.js';
import partialDomain from '../utils/partialDomain.js';
import padScale from '../utils/padScale.js';

export default function createScale (which) {
	return function scaleCreator ([$scale, $limit, $extents, $domain, $padding, $nice, $reverse]) {
		if ($extents === null) {
			return null;
		}

		const defaultRange = $reverse === true ? [$limit, 0] : [which === 'r' ? 1 : 0, $limit];

		const scale = $scale === defaultScales[which] ? $scale() : $scale.copy();

		/* --------------------------------------------
		 * On creation, `$domain` will already have any nulls filled in
		 * But if we set it via the context it might not, so rerun it through partialDomain
		 */
		scale
			.domain(partialDomain($extents[which], $domain))
			.range(defaultRange);

		if ($padding) {
			scale.domain(padScale(scale, $padding));
		}

		if ($nice === true) {
			if (typeof scale.nice === 'function') {
				scale.nice();
			} else {
				console.error(`Layer Cake warning: You set \`${which}Nice: true\` but the ${which}Scale does not have a \`.nice\` method. Ignoring...`);
			}
		}

		return scale;
	};
}
