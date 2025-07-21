import { compress_and_encode_text } from './createReplHash.js';

export default async function constructReplLink(pageName, content) {
	// TODO, clean up import paths
	const pages = [content.main]
		.concat(content.components)
		.concat(content.componentModules)
		.concat(content.modules)
		.concat(content.componentComponents);
	// .concat(content.jsons)
	// .concat(content.csvs);

	const pageTitle = (pageName || '') + ' LayerCake Example';

	const json = {
		name: pageTitle.trim(),
		files: pages.map(c => {
			const name = c.title.split('/').pop().replace('+page.svelte', 'App.svelte');
			return {
				type: 'file',
				name: name,
				basename: name,
				contents: c.contents,
				text: true
			};
		})
	};

	const encoded = await compress_and_encode_text(JSON.stringify(json));
	return `https://svelte.dev/playground/hello-world?version=5.36.8#${encoded}`;
}
