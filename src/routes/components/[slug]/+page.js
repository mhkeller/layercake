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
	}

	// Pass the endpoint's own status along so asking for a component that isn't there
	// is a 404. Anything outside the error range means something else went wrong.
	error(
		res.status >= 400 && res.status <= 599 ? res.status : 500,
		`Could not load ${url}: ${content.message}`
	);
}
