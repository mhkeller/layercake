import { json } from '@sveltejs/kit';
import getComponentContent from '../../../_modules/getComponentContent.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	// SvelteKit fills in `slug` from the [slug] folder name
	return json(getComponentContent(params.slug));
}
