/* --------------------------------------------
 *
 * Constract a bounding box relative in our coordinate space
 * that we can attach arrow starting points to
 *
 * --------------------------------------------
 */
export default function getElPosition (el) {
	const annotationBbox = el.getBoundingClientRect();
	const parentBbox = el.parentNode.getBoundingClientRect();
	const coords = {
		top: annotationBbox.top - parentBbox.top,
		right: annotationBbox.right - parentBbox.left,
		bottom: annotationBbox.bottom - parentBbox.top,
		left: annotationBbox.left - parentBbox.left,
		width: annotationBbox.width,
		height: annotationBbox.height
	};
	return coords;
}
