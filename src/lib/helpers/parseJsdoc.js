/** * @param {string} annotation */
export default function parseJsdoc(annotation) {
	const regex = /@(type|property)\s\{(.+?)\}\s+(\w+|\[.*?\]) - (.+)/;

	const match = annotation.match(regex);

	if (!match) return null;

	const [, kind, type, nameAndDefaultValue, description] = match;

	let name = '';
	let required = true;
	let defaultValue = null;

	if (nameAndDefaultValue.startsWith('[') && nameAndDefaultValue.endsWith(']')) {
		if (nameAndDefaultValue.includes('=')) {
			const regexNameDefaultValue = /\[(\w+)=(.+)\]/;
			[, name, defaultValue] = nameAndDefaultValue.match(regexNameDefaultValue);
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
