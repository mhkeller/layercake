import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	// SvelteKit fills in `slug` from the [slug] folder name
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
	}

	// Pass the endpoint's status through, so a component that doesn't exist is a
	// 404. A status outside the 400 to 599 range isn't an HTTP error we can show,
	// so report a 500.
	error(
		res.status >= 400 && res.status <= 599 ? res.status : 500,
		`Could not load ${url}: ${content.message}`
	);
}
