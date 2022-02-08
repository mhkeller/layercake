export default function cleanTitle(title) {
	const parts = title.split('/');
	const nameParts = parts[parts.length - 1].split('.')
	nameParts.pop();
	const cleaned = nameParts.join('.').toLowerCase();
	return cleaned;
}
