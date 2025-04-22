<script>
	let { status, error } = $props();
</script>

<h1>hiase</h1>
<svelte:head>
	<title>{status}</title>
</svelte:head>

{#if error}
	<div class="error">
		<h1>{status}</h1>

		<p>{error.message}</p>

		{#if error.stack}
			<pre>{error.stack}</pre>
		{/if}
	</div>
{/if}

<style>
	:global(body) {
		background: #f0c !important;
	}
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	.error {
		padding: 2em;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
