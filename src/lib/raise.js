/* --------------------------------------------
 *
 * Move an element to the last child
 * Adapted from d3-selection `.raise`
 * https://github.com/d3/d3-selection#selection_raise
 *
 * --------------------------------------------
 */
export default function raise(el) {
	if (el.nextSibling) el.parentNode.appendChild(el);
}
