import { error } from '@sveltejs/kit';

/** @typedef {import('../../_modules/getSections.js').GuideSection} GuideSection */

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('guide.json');
	const body = await res.json();

	if (res.status === 200) {
		return { sections: /** @type {GuideSection[]} */ (body) };
	}
	error(500, `Could not load the guide: ${body.message}`);
}
