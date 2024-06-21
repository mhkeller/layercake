import calcUniques from '../lib/calcUniques.js';
import calcExtents from '../lib/calcExtents.js';

import isOrdinalDomain from './isOrdinalDomain.js';

/* --------------------------------------------
 * Figure out which of our scales are ordinal
 * and calculate unique items for them
 * for the others, calculate an extent
 */
export default function calcScaleExtents(flatData, getters, activeScales) {
	const scaleGroups = Object.entries(activeScales).reduce(
		(groups, [k, scaleInfo]) => {
			const domainType = isOrdinalDomain(scaleInfo.scale) === true ? 'ordinal' : 'other';
			// @ts-ignore
			if (!groups[domainType]) groups[domainType] = {};
			groups[domainType][k] = getters[k];
			return groups;
		},
		{ ordinal: false, other: false }
	);

	let extents = {};
	if (scaleGroups.ordinal) {
		const sortOptions = Object.fromEntries(
			Object.entries(activeScales).map(([k, scaleInfo]) => {
				return [k, scaleInfo.sort];
			})
		);
		extents = calcUniques(flatData, scaleGroups.ordinal, sortOptions);
	}
	if (scaleGroups.other) {
		// @ts-ignore
		extents = { ...extents, ...calcExtents(flatData, scaleGroups.other) };
	}

	return extents;
}
