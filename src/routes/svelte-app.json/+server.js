import { json } from '@sveltejs/kit';
import getTemplateFiles from '../../_modules/getTemplateFiles.js';

// The Download button fetches this on click, so no page links to it.
// svelte.config.js lists it in prerender.entries.
export const prerender = true;

export async function GET() {
	const { files } = await getTemplateFiles();
	return json(files);
}
