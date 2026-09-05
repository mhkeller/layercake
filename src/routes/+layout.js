import { error } from '@sveltejs/kit';

/** @typedef {import('../_modules/getSections.js').GuideSection} GuideSection */

export const prerender = true;
export const trailingSlash = 'never';

export async function load({ fetch }) {
	// Headings only. The guide page loads the rendered html itself.
	const res = await fetch('/api/guide-sections.json');
	const body = await res.json();

	if (res.status === 200) {
		return { sections: /** @type {GuideSection[]} */ (body) };
	}
	error(500, `Could not load guide sections: ${body.message}`);
}
