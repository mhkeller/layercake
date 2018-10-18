/* --------------------------------------------
 * If we have a domain from settings, fill in
 * any null values with ones from our measured extents
 * otherwise, return the measured extent
 */
export default function partialDomain (doughmain, directive) {
	if (Array.isArray(directive) === true) {
		return directive.map((d, i) => {
			if (d === null) {
				return doughmain[i];
			}
			return d;
		});
	} else {
		return doughmain;
	}
}
