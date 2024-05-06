/* --------------------------------------------
 *
 * Parse various inputs and return then as a number
 * Can be a number, which will return the input value
 * A percentage, which will take the percent of the appropriate dimentions
 * A pixel value, which will parse as a number
 *
 * --------------------------------------------
 */
export default function parseCssValue(d, i, width, height) {
	if (!d) return 0;
	if (typeof d === 'number') {
		return d;
	}
	if (d.indexOf('%') > -1) {
		return (+d.replace('%', '') / 100) * (i ? height : width);
	}
	return +d.replace('px', '');
}
