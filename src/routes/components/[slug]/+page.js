import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const { slug } = params;
	const url = `${slug}.json`;
	const res = await fetch(url);
	const content = await res.json();

	if (res.status === 200) {
		return {
			slug,
			content,
			active: slug
		};
	} else {
		error(500, `Could not load ${url}: ${content.message}`);
	}
}
