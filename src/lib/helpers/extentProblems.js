/**
 * Diagnose a measured `[min, max]` extent. The two classic silent chart
 * failures both show up here: a typo'd accessor key measures nothing, and CSV
 * numbers still in string form compare alphabetically ('9' > '10').
 * @param {Array<any>} extent The measured `[min, max]`.
 * @param {number} rowCount How many rows were measured. An empty dataset measures nothing without that being a problem.
 * @returns {'empty'|'strings'|null} The problem, or null when the extent looks healthy.
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
