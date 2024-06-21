import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('guide.json');
	const data = await res.json();

	if (res.status === 200) {
		return { sections: data };
	} else {
		error(500, `Could not load.`);
	}
}
