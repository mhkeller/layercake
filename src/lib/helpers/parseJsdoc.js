/** * @param {string} annotation */
export default function parseJsdoc(annotation) {
	// Splits a JSDoc definition into its parts.
	// @type {boolean} foor - Required variable `foo`.
	// @type {number} [bar=1] - Optional variable `bar` with default value 1.
	const regex = /@(type|property)\s\{(.+?)\}\s+(\w+|\[.*?\]) - (.+)/;

	const match = annotation.match(regex);

	if (!match) return null;

	const [, kind, type, nameAndDefaultValue, description] = match;

	let name = '';
	let required = true;
	let defaultValue = null;

	// Optional parameters are enclosed in square brackets.
	// A default value is given after `=`, otherwise it's just the name.
	if (nameAndDefaultValue.startsWith('[') && nameAndDefaultValue.endsWith(']')) {
		if (nameAndDefaultValue.includes('=')) {
			const regexNameDefaultValue = /\[(\w+)\s*=\s*(.+)\]/;
			const defaultMatch = nameAndDefaultValue.match(regexNameDefaultValue);
			if (defaultMatch) {
				[, name, defaultValue] = defaultMatch;
			} else {
				// Fallback: just extract the name before the = sign
				const equalIndex = nameAndDefaultValue.indexOf('=');
				name = nameAndDefaultValue.slice(1, equalIndex).trim();
				defaultValue = nameAndDefaultValue.slice(equalIndex + 1, -1).trim();
			}
		} else {
			name = nameAndDefaultValue.slice(1, -1);
		}
		required = false;
	} else {
		name = nameAndDefaultValue;
	}

	return {
		kind,
		type,
		name,
		required,
		defaultValue,
		description
	};
}
