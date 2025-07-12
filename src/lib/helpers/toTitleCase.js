/**
 * Convert the first character of a string to uppercase.
 * @param {string} str The string to convert.
 * @returns {string} The string with the first character in uppercase.
 */
export default function toTitleCase(str) {
	return str.replace(/^\w/, d => d.toUpperCase());
}
