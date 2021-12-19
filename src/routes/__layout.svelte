<script context="module">
	export async function load({ params, fetch }) {
		return fetch(`api/guide-sections`).then(r => r.json()).then(sections => {
			return { props: { sections } };
		});
	}
</script>

<script lang="ts">
	import '../app.css';
	import '../hljs.css';

	import Nav from '../site-components/Nav.svelte';

	export let sections;
</script>


<Nav {sections} />
<main>
	<slot />
</main>
