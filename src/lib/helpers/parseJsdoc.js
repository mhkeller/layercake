/** * @param {string} annotation */
export default function parseJsdoc(annotation) {
	const regex = /@(type|property)\s\{(.+?)\}\s+(\[)?(\w+)(?:=(.+?))?\]? - (.+)/;

	const match = annotation.match(regex);

	if (!match) return null;

	const [, kind, type, required, name, defaultValue, description] = match;

	return {
		kind,
		type,
		name,
		required: !required,
		defaultValue: defaultValue || null,
		description
	};
}
