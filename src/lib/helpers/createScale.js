import defaultScales from '../settings/defaultScales.js';
import padScale from '../utils/padScale.js';
import getDefaultRange from '../settings/getDefaultRange.js';

export default function createScale(s) {
	return function scaleCreator([
		$scale,
		$extents,
		$domain,
		$padding,
		$nice,
		$reverse,
		$width,
		$height,
		$range,
		$percentScale
	]) {
		if ($extents === null) {
			return null;
		}

		const defaultRange = getDefaultRange(s, $width, $height, $reverse, $range, $percentScale);

		const scale = $scale === defaultScales[s] ? $scale() : $scale.copy();

		/* --------------------------------------------
		 * Set the domain
		 */
		scale.domain($domain);

		/* --------------------------------------------
		 * Set the range of the scale to our default if
		 * the scale doesn't have an interpolator function
		 * or if it does, still set the range if that function
		 * is the default identity function
		 */
		if (
			!scale.interpolator ||
			(typeof scale.interpolator === 'function' && scale.interpolator().name.startsWith('identity'))
		) {
			scale.range(defaultRange);
		}

		if ($padding) {
			scale.domain(padScale(scale, $padding));
		}

		if ($nice === true || typeof $nice === 'number') {
			if (typeof scale.nice === 'function') {
				scale.nice(typeof $nice === 'number' ? $nice : undefined);
			} else {
				console.error(
					`[Layer Cake] You set \`${s}Nice: true\` but the ${s}Scale does not have a \`.nice\` method. Ignoring...`
				);
			}
		}

		return scale;
	};
}
