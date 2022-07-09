import calcUniques from '../lib/calcUniques.js';
import calcExtents from '../lib/calcExtents.js';

import isOrdinalScale from './isOrdinalScale.js';

/* --------------------------------------------
 * Figure out which of our scales are ordinal
 * and calculate unique items for them
 * for the others, calculate an extent
 */
export default function calcScaleExtents (flatData, getters, activeScales) {
	const scaleGroups = Object.keys(activeScales).reduce((groups, k) => {
		const scaleType = isOrdinalScale(activeScales[k]);
		// @ts-ignore
		if (!groups[scaleType]) groups[scaleType] = {};
		groups[scaleType][k] = getters[k];
		return groups;
	}, { ordinal: false, other: false});

	let extents = {};
	if (scaleGroups.ordinal) {
		// @ts-ignore
		extents = calcUniques(flatData, scaleGroups.ordinal)
	}
	if (scaleGroups.other) {
		// @ts-ignore
		extents = { ...extents, ...calcExtents(flatData, scaleGroups.other) }
	}

	return extents;
}
