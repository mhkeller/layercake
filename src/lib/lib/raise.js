/**
	Move an element to the last child. Adapted from d3-selection `.raise`: https://github.com/d3/d3-selection#selection_raise
	@param {Element} el The element to move to the end.
	@returns {void}
*/
export default function raise(el) {
	if (el.nextSibling && el.parentNode) {
		el.parentNode.appendChild(el);
	}
}
