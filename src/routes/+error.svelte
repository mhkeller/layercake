<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status}</title>
</svelte:head>

<div class="error">
	<h1>{page.status}</h1>
	<p>{page.error?.message}</p>
</div>

<style>
	.error {
		max-width: 54em;
		margin: 0 auto;
		padding: 2em;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
