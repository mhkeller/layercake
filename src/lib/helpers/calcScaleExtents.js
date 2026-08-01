import calcUniques from '../lib/calcUniques.js';
import calcExtents from '../lib/calcExtents.js';

/**
 * Measure the extent of every dimension being scaled: the unique values for
 * ordinal scales, a `[min, max]` for the rest.
 * @param {Array<object>} flatData A flat array of data objects.
 * @param {Record<string, Function>} getters The accessor for each dimension, keyed by dimension name.
 * @param {Record<string, { isOrdinal: boolean, sort?: boolean }>} dimensionInfo Whether each of those dimensions measures unique values, and whether to sort them.
 * @returns {Record<string, Array<any>>} The measured extent for each dimension.
 */
export default function calcScaleExtents(flatData, getters, dimensionInfo) {
	// Split the accessors by how their dimension measures a domain
	/** @type {Record<string, Function>} */
	const ordinalGetters = {};
	/** @type {Record<string, Function>} */
	const otherGetters = {};

	for (const [name, info] of Object.entries(dimensionInfo)) {
		const group = info.isOrdinal === true ? ordinalGetters : otherGetters;
		group[name] = getters[name];
	}

	/** @type {Record<string, Array<any>>} */
	let extents = {};

	if (Object.keys(ordinalGetters).length > 0) {
		const sortOptions = Object.fromEntries(
			Object.entries(dimensionInfo).map(([name, info]) => [name, info.sort === true])
		);
		extents = calcUniques(flatData, ordinalGetters, sortOptions);
	}
	if (Object.keys(otherGetters).length > 0) {
		extents = { ...extents, ...calcExtents(flatData, otherGetters) };
	}

	return extents;
}
