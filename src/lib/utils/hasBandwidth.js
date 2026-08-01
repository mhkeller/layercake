/**
 * Whether a scale is a band or point scale, i.e. has a `.bandwidth` method.
 * @param {any} scale A D3 scale, or undefined.
 * @returns {boolean}
 */
export default function hasBandwidth(scale) {
	return typeof scale?.bandwidth === 'function';
}
