<script context="module">
	// export async function load({ fetch }) {
	// 	const res = await fetch(`./api/guide-sections.json`);
	// 	const data = await res.json();

	// 	if (res.status === 200) {
	// 		return {
	// 			props: {
	// 				sections: data
	// 			}
	// 		};
	// 	} else {
	// 		return {
	// 			status: res.status,
	// 			error: new Error(`Could not load guide sections: ${data.message}`)
	// 		}
	// 	}
	// }
</script>
<script lang="ts">
	import '../app.css';
	import '../hljs.css';

	import Nav from './_site-components/Nav.svelte';

	export let sections = []
</script>


<Nav {sections} />
<main>
	<slot />
</main>
