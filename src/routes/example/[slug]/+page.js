import { error } from '@sveltejs/kit';

/** @typedef {import('../../../_modules/getExampleContent.js').ExampleContent} ExampleContent */

export async function load({ fetch, params }) {
	const url = `${params.slug}.json`;
	const res = await fetch(url);
	const body = await res.json();

	if (res.status === 200) {
		return {
			slug: params.slug,
			content: /** @type {ExampleContent} */ (body),
			active: '+page'
		};
	}

	// Pass the endpoint's status through, so an example that doesn't exist is a
	// 404. A status outside the 400 to 599 range isn't an HTTP error we can show,
	// so report a 500.
	error(
		res.status >= 400 && res.status <= 599 ? res.status : 500,
		`Could not load ${url}: ${body.message}`
	);
}
