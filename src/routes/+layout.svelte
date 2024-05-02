<script lang="ts">
	import '../app.css';
	import '../hljs.css';

	import Nav from './_site-components/Nav.svelte';

	export let data
</script>


<!-- <Nav sections={data.sections} /> -->
<main>
	<slot />
</main>
