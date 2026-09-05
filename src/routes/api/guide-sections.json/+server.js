import { json } from '@sveltejs/kit';
import getSections from '../../../_modules/getSections.js';

/** @type {ReturnType<typeof getSections> | undefined} */
let sections;

export async function GET() {
	if (!sections || process.env.NODE_ENV !== 'production') {
		sections = getSections(false);
	}

	return json(sections);
}
