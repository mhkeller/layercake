import calcUniques from '../lib/calcUniques.js';
import calcExtents from '../lib/calcExtents.js';

/**
 * Measure one dimension's extent from the data: the unique values when the
 * dimension is ordinal, a `[min, max]` otherwise.
 * @param {string} name The dimension name, e.g. `'x'`.
 * @param {(d: any, i?: number) => any} accessor The dimension's accessor.
 * @param {Array<any>} data The rows to measure.
 * @param {boolean} isOrdinal Whether the dimension measures unique values rather than a min and max.
 * @param {boolean} sort Whether measured unique values come back sorted. Ignored for non-ordinal dimensions.
 * @returns {Array<any>} The measured extent.
 */
export default function measureExtent(name, accessor, data, isOrdinal, sort) {
	if (isOrdinal === true) {
		return calcUniques(data, { [name]: accessor }, { [name]: sort === true })[name];
	}
	return calcExtents(data, { [name]: accessor })[name];
}
