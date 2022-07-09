/* --------------------------------------------
 * Set attributes on an element
 */
export default function setElementAttributes(element, attrs) {
	if (typeof attrs === 'object' && !Array.isArray(attrs) && attrs !== null) {
		const attrKeys = Object.keys(attrs);
		for (let i = 0; i < attrKeys.length; i++) {
			const attr = attrKeys[i];
			const property = attrs[attr];
			if (element.getAttribute(attr) !== property) {
				element.setAttribute(attr, property);
			}
		}
	} else {
		console.warn('[LayerCake] `attrs` property must be an object. You passed in:', attrs);
	}
}
