import { json } from '@sveltejs/kit';
import getExampleContent from '../../../_modules/getExampleContent.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	// SvelteKit fills in `slug` from the [slug] folder name
	return json(
		getExampleContent(params.slug, {
			examplesDir: 'src/routes/_examples',
			contentDir: 'src/content/examples'
		})
	);
}
