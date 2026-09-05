<script>
	import '../app.css';
	import '../hljs.css';

	import Nav from './_site-components/Nav.svelte';

	let { data, children } = $props();
</script>

<!-- When a page throws while rendering, SvelteKit shows +error.svelte inside this
     layout with no data. The nav still renders then, just without the guide list. -->
<Nav sections={data?.sections ?? []} />
<main>
	{@render children?.()}
</main>
