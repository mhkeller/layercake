import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const url = `${params.slug}.json`;
	const res = await fetch(url);
	const content = await res.json();

	if (res.status === 200) {
		return {
			slug: params.slug,
			content,
			active: '+page'
		};
	} else {
		throw error(500, `Could not load ${url}: ${content.message}`);
	}
}
