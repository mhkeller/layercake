<script>
	import '../app.css';
	import '../hljs.css';

	import Nav from './_site-components/Nav.svelte';

	let { data, children } = $props();
</script>

<Nav sections={data.sections} />
<main>
	{@render children?.()}
</main>
