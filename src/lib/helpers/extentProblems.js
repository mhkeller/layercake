/**
 * Check a measured `[min, max]` for the two mistakes that otherwise fail
 * silently. A misspelled accessor key measures nothing. Numbers still in
 * string form, as they come out of a CSV, compare alphabetically so '9' > '10'.
 * @param {Array<any>} extent The measured `[min, max]`.
 * @param {number} rowCount How many rows were measured. Measuring nothing from zero rows is fine.
 * @returns {'empty'|'strings'|null} The problem, or null when the extent looks fine.
 */
export default function extentProblems(extent, rowCount) {
	if (rowCount > 0 && extent[0] === null && extent[1] === null) {
		return 'empty';
	}
	if (typeof extent[0] === 'string' || typeof extent[1] === 'string') {
		return 'strings';
	}
	return null;
}
