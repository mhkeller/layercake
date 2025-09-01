/**
 * A utility function to convert numerical values in CSVs with the 
 * rollup plugin-dsv in `vite.config.js`.
 * @param {string} value
 * @returns {string|number}
 */
export default function processCsvValue(value) {
	const number = Number(value);
	if (value !== '' && !isNaN(number)) {
		return number;
	} else {
		return value;
	}
}
