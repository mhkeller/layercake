import { csvParse } from 'd3-dsv';

import { compress_and_encode_text } from './createReplHash.js';

export default async function constructReplLink(pageName, content) {
	// TODO, clean up import paths
	const pages = [content.main]
		.concat(content.components)
		.concat(content.componentModules)
		.concat(content.modules)
		.concat(content.componentComponents)
		.concat(content.jsons)
		.concat(content.csvs);

	const pageTitle = (pageName || '') + ' - LayerCake Example';

	const json = {
		name: pageTitle.trim(),
		files: pages.map(c => {
			const filename = c.title.split('/').pop();
			const name = cleanName(filename);
			return {
				type: 'file',
				name,
				basename: name,
				contents: cleanContents(filename, c.contents),
				text: true
			};
		})
	};

	const encoded = await compress_and_encode_text(JSON.stringify(json));
	return `https://svelte.dev/playground/hello-world?version=5.35.7#${encoded}`;
}

/**
 * Clean up the name of the file to match the REPL expectations.
 * @param {string} name - The original file name.
 * @return {string} - The cleaned file name.
 */
function cleanName(name) {
	return (
		name
			// Replace the SvelteKit name with the base REPL name
			.replace('+page.svelte', 'App.svelte')
			// Load csv files as JS files
			.replace('.csv', '.js')
	);
}

/**
 * Clean up the contents of the file to match the REPL expectations.
 * @param {string} filename - The name of the file.
 * @param {string} contents - The contents of the file.
 * @return {string} - The cleaned contents of the file.
 */
function cleanContents(filename, contents) {
	// If the file is a CSV, we need to wrap it in a JS module
	if (filename.endsWith('.csv')) {
		return `export default ${JSON.stringify(csvParse(contents))};`;
	}
	// If the file is a JSON, we need to wrap it in a JS module
	// if (filename.endsWith('.json')) {
	// 	return `export default ${contents};`;
	// }
	return contents
		.replaceAll(`.csv'`, `.js'`)
		.replaceAll('./_components', '.')
		.replaceAll('../_modules', '.')
		.replaceAll('./_modules', '.')
		.replaceAll('./_data', '.');
}
